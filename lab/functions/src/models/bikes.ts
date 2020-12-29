interface Schema {
  BRAND: string,
	MODEL: string,
	COLOR: string,
	HORSE_POWER: number,
  CATEGORY: string[],
  PRICE: number
}

let initial_data:Array<Schema> = [
	{
		'BRAND': 'Ducati',
		'MODEL': '797',
		'HORSE_POWER': 75,
		'COLOR': 'WHITE',
		'PRICE': 1000,
		'CATEGORY': [
			'naked',
			'urban'
		]
	},
	{
		'BRAND': 'Ducati',
		'MODEL': '821',
		'HORSE_POWER': 100,
		'COLOR': 'DARK',
		'PRICE': 1500,
		'CATEGORY': [
			'naked',
			'race'
		]
	},
	{
		'BRAND': 'Suzuki',
		'MODEL': 'GSX-R',
		'HORSE_POWER': 150,
		'COLOR': 'BLUE',
		'PRICE': 2000,
		'CATEGORY': [
			'race'
		]
	},
]

export { Schema, initial_data };
