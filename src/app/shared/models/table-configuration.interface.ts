export interface TableConfiguration {
    id: string,
    title: string,
    type: 'text' | 'number' | 'img',
    textToAdd?: string
}