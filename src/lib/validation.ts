export interface ApplicationFormValues {
  productName: string
  purchasePlace: string
  fullName: string
  phone: string
}

export type ApplicationFormErrorKey =
  | 'productName'
  | 'purchasePlace'
  | 'fullName'
  | 'fullNameShort'
  | 'phone'
  | 'phoneInvalid'

export type ApplicationFormErrors = Partial<
  Record<keyof ApplicationFormValues, ApplicationFormErrorKey>
>

export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function validateApplicationForm(
  values: ApplicationFormValues,
): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {}

  if (!values.productName.trim()) {
    errors.productName = 'productName'
  }

  if (!values.purchasePlace.trim()) {
    errors.purchasePlace = 'purchasePlace'
  }

  if (!values.fullName.trim()) {
    errors.fullName = 'fullName'
  } else if (values.fullName.trim().split(/\s+/).length < 2) {
    errors.fullName = 'fullNameShort'
  }

  if (!values.phone.trim()) {
    errors.phone = 'phone'
  } else if (!isValidPhone(values.phone)) {
    errors.phone = 'phoneInvalid'
  }

  return errors
}
