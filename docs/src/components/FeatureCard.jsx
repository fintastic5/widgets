import styles from "./FeatureCard.module.css";

function FeatureCard({icon, title, description}) {
  return (
    <>
      {/* Key Feature Highlights */}
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          {icon}
        </div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDesc}>
          {description}
        </p>
      </div>  
    </>
  )
}

export default FeatureCard
