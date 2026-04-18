import { services } from '@/lib/site-data';

export default function Services() {
  return (
    <section className="container section">
      <h2>How we deliver ROI fast</h2>
      <div className="grid cards3">
        {services.map((service) => (
          <article className="card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
