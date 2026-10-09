export default function PageHero({ title, sub }) {
  return (
    <section className="page-hero">
      <div className="container center">
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
    </section>
  )
}
