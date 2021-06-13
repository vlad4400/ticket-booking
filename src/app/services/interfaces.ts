export interface User {
  email: string,
  password: string
}

export interface Order {
  departure: string,
  arrives: string,
  date: string,
  ticketsStr: string,
  baggagesStr: string
}
