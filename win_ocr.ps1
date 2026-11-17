Add-Type -AssemblyName System.Drawing

[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()

for ($p = 1; $p -le 8; $p++) {
    $thumbPath = Resolve-Path "extracted_assets/thumbs/p$($p)_thumb.jpg"
    $asyncOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($thumbPath)
    $file = $asyncOp.AsTask().GetAwaiter().GetResult()
    
    $streamOp = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
    $stream = $streamOp.AsTask().GetAwaiter().GetResult()
    
    $decoderOp = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
    $decoder = $decoderOp.AsTask().GetAwaiter().GetResult()
    
    $bmpOp = $decoder.GetSoftwareBitmapAsync()
    $bitmap = $bmpOp.AsTask().GetAwaiter().GetResult()
    
    $ocrOp = $engine.RecognizeAsync($bitmap)
    $result = $ocrOp.AsTask().GetAwaiter().GetResult()
    
    Write-Host "=== PAGE $p ==="
    Write-Host $result.Text
    Write-Host "--------------------------------"
}
