import styles from './index.less' ;

const Page0 = () => {
	
	return (
		<div className={styles.pcontainer}>
			<div className={styles.logo}>MAGIC</div>
			<div className={styles.textBoxFa}>
				<div className={`${styles.textBox} ${styles.textBoxDelay1}`}>本届世界杯</div>
				<div className={`${styles.textBox} ${styles.textBoxDelay2}`}>共150粒进球</div>
				<div className={`${styles.textBox} ${styles.textBoxDelay3}`}>
					<div>左脚50粒</div>
					<div className={`${styles.textBox32}`}>33%</div>
				</div>
				<div className={`${styles.textBox} ${styles.textBoxDelay4}`}>
					<div>右脚脚90粒</div>
					<div className={`${styles.textBox42}`}>60%</div>	
				</div>
				<div className={`${styles.textBox} ${styles.textBoxDelay5}`}>
					<div>头球10粒</div>
					<div className={`${styles.textBox52}`}>7%</div>
				</div>
			</div>

		</div>
	)
}

export default Page0;