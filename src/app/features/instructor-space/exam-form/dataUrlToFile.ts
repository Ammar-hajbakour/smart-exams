export async function dataUrlToFile(dataUrl: string, fileName?: string): Promise<File> {

    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    const FileType = dataUrl.substring(5, dataUrl.indexOf(';'))
    return new File([blob], fileName ?? 'Exam Image', { type: FileType });
}
