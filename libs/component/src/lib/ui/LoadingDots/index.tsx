import styles from './loading-dots.module.css';

export const LoadingDots = ({
  color = '#000',
  style = 'small',
}: {
  color: string;
  style: string;
}) => {
  return (
    <span className={style === 'small' ? styles.loading2 : styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

LoadingDots.defaultProps = {
  style: 'small',
};

export default LoadingDots;
