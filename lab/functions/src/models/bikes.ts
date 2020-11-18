interface Schema {
	_id?: string | undefined;
  BRAND: string;
  MODEL: string;
	HORSE_POWER: number;
}

let initial_data:Array<Schema> = [
	{
		'BRAND': 'Ducati',
		'MODEL': '797',
		'HORSE_POWER': 75
	},
	{
		'BRAND': 'Ducati',
		'MODEL': '821',
		'HORSE_POWER': 100
	},
	{
		'BRAND': 'Suzuki',
		'MODEL': 'GSX-R',
		'HORSE_POWER': 150
	},
]

export { Schema, initial_data };
