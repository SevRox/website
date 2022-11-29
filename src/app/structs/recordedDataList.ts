export interface RecordedDataList {
    id: number,
    board_mac: string,
    started: Date,
    ended: Date,
    duration: number,
    checkBoxState: boolean
}

export interface HttpRecordedDataList {
    id: number,
    board_mac: string,
    started: string,
    ended: string
}

