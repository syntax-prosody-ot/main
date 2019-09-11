/* Testing tone annotations with various options 9/10/19
	 Max Tarlov
*/
var basicTreeRight = {
	id: "root",
	cat: "i",
	tones: "LH",
	children: [
		{
			id: "one",
			cat: "w",
			tones: "LH"
		},
		{
			id: "phi1",
			cat: "phi",
			tones: "LH",
			children: [
				{
					id: "two",
					tones: "LH",
					cat: "w"
				},
				{
					id: "phi2",
					tones: "LH",
					cat: "phi",
					children: [
						{
							id: "three",
							tones: "LH",
							cat: "w"
						},
						{
							id: "four",
							tones: "LH",
							cat: "w"
						}
					]
				}
			]
		}
	]
}

var basicTreeLeft = {
	"id": "root",
  "cat": "i",
	tones: "HL",
  "children": [
    {
    	"cat": "phi",
      "id": "phi1",
			tones: "HL",
      "children": [
        {
          "cat": "phi",
          "id": "phi2",
					tones: "HL",
          "children": [
            {
              "id": "one",
							tones: "HL",
            	"cat": "w"
          	},
          	{
          		"id": "two",
							tones: "HL",
              "cat": "w"
            }
          ]
				 },
        	{
            "id": "three",
						tones: "HL",
            "cat": "w"
          }
      	]
  		},
    	{
      	"id": "four",
				tones: "HL",
      	"cat": "w"
  		}
    ]
  }

var basicTreeCenter = {
	id: "root",
	cat: "i",
	tones: "LH",
	children: [
		{
			id: "phi1",
			cat: "phi",
			tones: "HL",
			children: [
				{
					"id": "one",
					tones: "HL",
					"cat": "w"
				},
				{
					"id": "two",
					tones: "HL",
					"cat": "w"
				}
			]
		},
		{
			id: "phi2",
			cat: "phi",
			tones: "HL",
			children: [
				{
					id: "three",
					tones: "LH",
					cat: "w"
				},
				{
					id: "four",
					tones: "LH",
					cat: "w"
				}
			]
		}
	]
}
