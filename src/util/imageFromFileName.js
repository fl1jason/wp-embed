const imageUrlPath = 'https://www.fl1digital.com/quote/assets';
const imageFromFileName = (filename) =>{

    let ImageUrl = '';
    const image = filename.split('.');
    const extension = image[image.length-1];

    // strip anything after the ? from the extension
    const extension_no_question = extension.split('?')[0].toLowerCase();
        
    switch (extension_no_question) 
    {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            ImageUrl = filename;
            break;
        case 'doc':
        case 'docx':
            ImageUrl = `${imageUrlPath}/word.png`
            break;
        case 'xls':
        case 'xlsx':
            ImageUrl = `${imageUrlPath}/excel.png`;
            break;
        case 'ppt':
        case 'pptx':
            ImageUrl = `${imageUrlPath}/powerpoint.png`;
            break;
        case 'pdf':
            ImageUrl = `${imageUrlPath}/pdf.png`;
            break;
        case 'zip':
        case 'rar':
            ImageUrl = `${imageUrlPath}/zip.png`;
            break;
        default:
            ImageUrl = `${imageUrlPath}/file.png`;
    }
    return (ImageUrl);
}

export default imageFromFileName;
