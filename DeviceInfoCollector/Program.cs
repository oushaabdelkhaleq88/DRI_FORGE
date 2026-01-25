using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Management;
using System.Threading.Tasks;
using Newtonsoft.Json;

class Program
{
    static async Task Main()
    {
        string filePath = "device_info.js";
        using (StreamWriter writer = new StreamWriter(filePath))
        {
            writer.WriteLine("{"); // Start with opening brace

            var infoLines = new System.Collections.Generic.List<string>();

            AddInfo(infoLines, "CPU", "Win32_Processor", "Name");
            AddInfo(infoLines, "RAM", "Win32_PhysicalMemory", "Capacity");
            AddInfo(infoLines, "Motherboard", "Win32_BaseBoard", "Product");
            AddInfo(infoLines, "BIOS", "Win32_BIOS", "Version");
            AddInfo(infoLines, "Keyboard", "Win32_Keyboard", "Name");
            AddInfo(infoLines, "Touchpad", "Win32_PointingDevice", "Name");

            AddDisplayInfo(infoLines);
            AddGpuInfo(infoLines);
            
            writer.WriteLine(string.Join(",\n", infoLines));

            writer.WriteLine("}"); // End with closing brace
        }

        Console.WriteLine("System info saved to device_info.js");

        await SendToBackend(filePath);
    }

    static void AddInfo(System.Collections.Generic.List<string> infoLines, string label, string wmiClass, string property)
    {
        try
        {
            var searcher = new ManagementObjectSearcher($"SELECT * FROM {wmiClass}");
            foreach (ManagementObject obj in searcher.Get())
            {
                infoLines.Add($"  \"{label}\": \"{obj[property]}\"");
                break;
            }
        }
        catch (Exception ex)
        {
            infoLines.Add($"  \"{label}\": \"Error - {ex.Message}\"");
        }
    }

    static void AddGpuInfo(System.Collections.Generic.List<string> infoLines)
    {
        try
        {
            var searcher = new ManagementObjectSearcher("SELECT * FROM Win32_VideoController");
            foreach (ManagementObject obj in searcher.Get())
            {
                string name = obj["Name"]?.ToString() ?? "Unknown GPU";
                string deviceId = obj["PNPDeviceID"]?.ToString() ?? "";

                if (deviceId.Contains("PCI") && !deviceId.Contains("VEN_8086"))
                {
                    infoLines.Add($"  \"DiscreteGPU\": \"{name}\"");
                }
                else if (deviceId.Contains("IGD") || deviceId.Contains("VEN_8086"))
                {
                    infoLines.Add($"  \"IntegratedGPU\": \"{name}\"");
                }
                else
                {
                    infoLines.Add($"  \"GPU_Unclassified\": \"{name}\"");
                }
            }
        }
        catch (Exception ex)
        {
            infoLines.Add($"  \"GPU\": \"Error - {ex.Message}\"");
        }
    }

    static void AddDisplayInfo(System.Collections.Generic.List<string> infoLines)
    {
        try
        {
            string displayName = null;

            var monitorSearcher = new ManagementObjectSearcher("SELECT * FROM Win32_DesktopMonitor");
            foreach (ManagementObject obj in monitorSearcher.Get())
            {
                displayName = obj["Name"]?.ToString();
                if (!string.IsNullOrEmpty(displayName) && !displayName.ToLower().Contains("default"))
                    break;
            }

            if (string.IsNullOrEmpty(displayName) || displayName.ToLower().Contains("default"))
            {
                var pnpSearcher = new ManagementObjectSearcher("SELECT * FROM Win32_PnPEntity WHERE Name LIKE '%Monitor%'");
                foreach (ManagementObject obj in pnpSearcher.Get())
                {
                    displayName = obj["Name"]?.ToString();
                    if (!string.IsNullOrEmpty(displayName))
                        break;
                }
            }

            infoLines.Add($"  \"Display\": \"{(string.IsNullOrEmpty(displayName) ? "Not identified" : displayName)}\"");
        }
        catch (Exception ex)
        {
            infoLines.Add($"  \"Display\": \"Error - {ex.Message}\"");
        }
    }

    static async Task SendToBackend(string filePath)
    {
        try
        {
            using (var client = new HttpClient())
            {
                var content = new MultipartFormDataContent();
                var fileBytes = File.ReadAllBytes(filePath);
                var fileContent = new ByteArrayContent(fileBytes);
                fileContent.Headers.ContentType = new MediaTypeHeaderValue("application/javascript");
                content.Add(fileContent, "file", Path.GetFileName(filePath));

                var response = await client.PostAsync("http://localhost:3000/upload", content);
                Console.WriteLine($"Upload status: {response.StatusCode}");

                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(responseBody);
                    string uploadedFilename = result.filename;

                    if (!string.IsNullOrEmpty(uploadedFilename))
                    {
                        string frontendUrl = $"http://localhost:5173/display-info?filename={uploadedFilename}";
                        System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo(frontendUrl) { UseShellExecute = true });
                        Console.WriteLine($"Redirecting to: {frontendUrl}");
                    }
                    else
                    {
                        Console.WriteLine("Upload successful, but no filename received from backend.");
                    }
                }
                else
                {
                    var errorBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Backend error: {errorBody}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Upload failed: {ex.Message}");
        }
    }
}