import styles from "./testimonials.module.css";

const testimonials = [
  {
    badge: "INVESTITOR",
    quote:
      "O abordare excepțională în afaceri. În cei șapte ani de colaborare, nu a existat nicio problemă nerezolvată.",
    name: "Nicolai Ciobanu",
    role: "INVESTITOR IMOBILIAR",
    since: "Ne este alături din 2016",
  },
  {
    badge: "PROPRIETAR",
    quote:
      "Planul pe care l-am semnat este apartamentul pe care l-am primit. Fiecare centimetru a corespuns proiectului — nu a fost nimic de renegociat pe șantier.",
    name: "Mariana Anghel",
    role: "PROPRIETAR DE APARTAMENT",
    since: "Ne este alături din 2019",
  },
  {
    badge: "PROPRIETAR",
    quote:
      "Am ales graficul de plată înainte să alegem etajul. Doi ani mai târziu, nicio rată nu s-a schimbat.",
    name: "Denis Covalenco",
    role: "PROPRIETAR DE APARTAMENT",
    since: "Ne este alături din 2022",
  },
] as const;

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>CE SPUN CLIENȚII NOȘTRI</h2>
        <p className={styles.subtitle}>Partea care se vede după predare.</p>
        <div className={styles.cards}>
          {testimonials.map((item) => (
            <article className={styles.card} key={item.name}>
              <div className={styles.cardTop}>
                <span className={styles.stars} aria-label="5 din 5 stele">
                  ★★★★★
                </span>
                <span className={styles.badge}>{item.badge}</span>
              </div>
              <p className={styles.quote}>{item.quote}</p>
              <div className={styles.person}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.role}>{item.role}</p>
                <p className={styles.since}>{item.since}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
