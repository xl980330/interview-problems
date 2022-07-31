interface Org {
  id: string
  name: string
  members: string[]
  parent: string | null
  type: string
  representation: string
  children?: []
}

interface Members {
  id: string | null | undefined
  name: string | null | undefined
  age: number | null | undefined
  status: string | null | undefined
  isEdit?: boolean
}

interface AlertForm {
  show: boolean
  orgShow: boolean
  title: string
  type: string
  index: number | null | undefined
  row: Org | null,
}

interface SubmitForm {
  parentId: string,
  name: string,
  representation: string
  selectParentData: Members[]
}

interface ChangeOrgForm {
  parent: string,
  name: string,
  members: string[]
}

export {
  Org,
  Members,
  AlertForm,
  SubmitForm,
  ChangeOrgForm
}
