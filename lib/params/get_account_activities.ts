export interface GetAccountActivities {
  activity_type: string
  date?: Date
  until?: Date
  after?: Date
  direction?: 'asc' | 'desc'
  page_size?: number
  page_token?: string
}
