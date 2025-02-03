import { Konoha } from '../icons/konoha'

export function Header() {
  return (
    <div className="flex w-full items-center justify-between py-16">
      <Konoha className="fill-accent-500 size-14" />

      <div className="flex flex-col gap-3">
        <h1 className="font-ninja text-accent-500 flex items-center gap-4 text-5xl">
          <span>Motion</span>
          <span>Labs</span>
        </h1>
        <p className="text-accent-500 font-ninja flex items-center gap-6 text-sm">
          Built and desinged by{' '}
          <a
            href="https://github.com/tigerabrodi"
            target="_blank"
            rel="noreferrer"
            className="text-accent-400 relative"
          >
            <span className="absolute top-1 -left-4">~</span>
            Tiger Abrodi <span className="absolute top-1 -right-4">~</span>
          </a>
        </p>
      </div>
    </div>
  )
}
