export interface ImageData {
    width: number
    height: number
    data: Uint8ClampedArray | Buffer | number[]
}

export interface ZbarProcessResult {
    symbol: string
    addon: string
    data: string
    loc: Location[]
}

export default function ZbarProcess(imageData: ImageData): ZbarProcessResult[]
