export function HomeEventCard({ title, description, imageUrl }) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg h-56">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url('${imageUrl}')`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex items-end p-6">
        <div className="flex items-center w-full gap-4">
          <div>
            <div className="text-white font-semibold text-lg">
              {title}
            </div>
            <div className="text-sm text-white/80">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}