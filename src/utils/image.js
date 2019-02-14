/**
 * getDataUrlFromFile
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
export const getDataUrlFromFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      resolve(reader.result)
    }

    reader.onabort = () => console.log('file reading was aborted') // eslint-disable-line no-console
    reader.onerror = reject
  })
}

/**
 * get File from Data Url
 *
 * @param {string} dataUrl
 * @param {string} filename
 * @param {number} lastModified
 * @returns {Promise<File|Blob>}
 */
export function getFileFromDataUrl(
  dataUrl,
  filename,
  lastModified = Date.now()
) {
  return new Promise(resolve => {
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    let file

    try {
      file = new File([u8arr], filename, { type: mime }) // Edge do not support File constructor
    } catch (e) {
      file = new Blob([u8arr], { type: mime })
      file.name = filename
      file.lastModified = lastModified
    }

    resolve(file)
  })
}

/**
 * drawImageInCanvas
 *
 * @param {HTMLImageElement} img
 * @param {object} pixelCrop
 * @param {string} mime  i.e image/png, image/jpeg
 * @param {float} quality from 0.1 to 1
 * @returns {Promise<Blob>}
 */
export const cropImage = (
  img,
  pixelCrop,
  mime = 'image/jpeg',
  quality = 0.9
) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    img,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return canvasToBlob(canvas, mime, quality)
}

export const canvasToBlob = (canvas, mime = 'image/jpeg', quality = 0.9) => {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      blob => {
        if (!blob) {
          // eslint-disable-next-line no-console
          console.error('Canvas is empty')
          reject()
        }

        resolve(blob)
      },
      mime,
      quality
    )
  )
}
