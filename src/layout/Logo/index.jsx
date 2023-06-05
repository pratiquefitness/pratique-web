import Image from 'next/image'

export default function Logo({ type = 'normal' }) {
  return type === 'normal' ? (
    <Image src="/logo.svg" width={220} height={58} />
  ) : (
    <Image src="/logo-min.svg" width={162} height={31} />
  )
}
