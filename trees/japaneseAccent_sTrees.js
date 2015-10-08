//These are sTrees corresponding to those in (40-41) in the handout. Names begin with 'sTree'. This is followed by 'L' for the left-branching trees in (40), and by 'R' for the right-branching trees in (41). The 'L' or 'R' is followed by an accent profile.

//Left-branching sTree 1 of 8; UUU, 'amerika-no tomodachi-no pasokon'; (40a) on the handout.

var sTreeLuuu = {
	"id":"NP1",
	"cat":"xp",
	"children":
		[
			{
				"id":"NP2",
				"cat":"xp",
				"children":
					[
						{
							"id":"NP3",
							"cat":"xp",
							"children":
								[
									{
										"id":"amerika-no_0",
										"cat":"x0",
										"accent":"u"
									}
								]
						},
						{
							"id":"tomodachi-no_1",
							"cat":"x0",
							"accent":"u"
						}
					]
			},
			{
				"id":"pasokon_2",
				"cat":"x0",
				"accent":"u"
			}
		]
};

//Left-branching sTree 2 of 8; UAA, 'amerika-no kurasumeeto-no rapputoppu'; (40b) on the handout.

var sTreeLuaa = {
	"id":"NP1",
	"cat":"xp",
	"children":
		[
			{
				"id":"NP2",
				"cat":"xp",
				"children":
					[
						{
							"id":"NP3",
							"cat":"xp",
							"children":
								[
									{
										"id":"amerika-no_0",
										"cat":"x0",
										"accent":"u"
									}
								]
						},
						{
							"id":"kurasumeeto-no_1",
							"cat":"x0",
							"accent":"a"
						}
					]
			},
			{
				"id":"rapputoppu_2",
				"cat":"x0",
				"accent":"a"
			}
		]
};

//Left-branching sTree 3 of 8; UAU, 'amerika-no kurasumeeto-no pasokon'; (40c) on the handout.

var sTreeLuau = {
	"id":"NP1",
	"cat":"xp",
	"children":
		[
			{
				"id":"NP2",
				"cat":"xp",
				"children":
					[
						{
							"id":"NP3",
							"cat":"xp",
							"children":
								[
									{
										"id":"amerika-no_0",
										"cat":"x0",
										"accent":"u"
									}
								]
						},
						{
							"id":"kurasumeeto-no_1",
							"cat":"x0",
							"accent":"a"
						}
					]
			},
			{
				"id":"pasokon_2",
				"cat":"x0",
				"accent":"u"
			}
		]
};

//Left-branching sTree 4 of 8; UUA, 'amerika-no tomodachi-no rapputoppu'; (40d) on the handout.

var sTreeLuua = {
	"id":"NP1",
	"cat":"xp",
	"children":
		[
			{
				"id":"NP2",
				"cat":"xp",
				"children":
					[
						{
							"id":"NP3",
							"cat":"xp",
							"children":
								[
									{
										"id":"amerika-no_0",
										"cat":"x0",
										"accent":"u"
									}
								]
						},
						{
							"id":"tomodachi-no_1",
							"cat":"x0",
							"accent":"u"
						}
					]
			},
			{
				"id":"rapputoppu_2",
				"cat":"x0",
				"accent":"a"
			}
		]
};

//Left-branching sTree 5 of 8; AAA, 'isuraeru-no kurasumeeto-no rapputoppu'; (40e) on the handout.

var sTreeLaaa = {
	"id":"NP1",
	"cat":"xp",
	"children":
		[
			{
				"id":"NP2",
				"cat":"xp",
				"children":
					[
						{
							"id":"NP3",
							"cat":"xp",
							"children":
								[
									{
										"id":"isuraeru-no_0",
										"cat":"x0",
										"accent":"a"
									}
								]
						},
						{
							"id":"kurasumeeto-no_1",
							"cat":"x0",
							"accent":"a"
						}
					]
			},
			{
				"id":"rapputoppu_2",
				"cat":"x0",
				"accent":"a"
			}
		]
};

//Left-branching sTree 6 of 8; AAU, 'isuraeru-no kurasumeeto-no pasokon'; (40f) on the handout.

var sTreeLaau = {
	"id":"NP1",
	"cat":"xp",
	"children":
		[
			{
				"id":"NP2",
				"cat":"xp",
				"children":
					[
						{
							"id":"NP3",
							"cat":"xp",
							"children":
								[
									{
										"id":"isuraeru-no_0",
										"cat":"x0",
										"accent":"a"
									}
								]
						},
						{
							"id":"kurasumeeto-no_1",
							"cat":"x0",
							"accent":"a"
						}
					]
			},
			{
				"id":"pasokon_2",
				"cat":"x0",
				"accent":"u"
			}
		]
};

//Left-branching sTree 7 of 8; AUA, 'isuraeru-no tomodachi-no rapputoppu'; (40g) on the handout.

var sTreeLaua = {
	"id":"NP1",
	"cat":"xp",
	"children":
		[
			{
				"id":"NP2",
				"cat":"xp",
				"children":
					[
						{
							"id":"NP3",
							"cat":"xp",
							"children":
								[
									{
										"id":"isuraeru-no_0",
										"cat":"x0",
										"accent":"a"
									}
								]
						},
						{
							"id":"tomodachi-no_1",
							"cat":"x0",
							"accent":"u"
						}
					]
			},
			{
				"id":"rapputoppu_2",
				"cat":"x0",
				"accent":"a"
			}
		]
};

//Left-branching sTree 8 of 8; AUU, 'isuraeru-no tomodachi-no pasokon'; (40g) on the handout.

var sTreeLauu = {
	"id":"NP1",
	"cat":"xp",
	"children":
		[
			{
				"id":"NP2",
				"cat":"xp",
				"children":
					[
						{
							"id":"NP3",
							"cat":"xp",
							"children":
								[
									{
										"id":"isuraeru-no_0",
										"cat":"x0",
										"accent":"a"
									}
								]
						},
						{
							"id":"tomodachi_1",
							"cat":"x0",
							"accent":"u"
						}
					]
			},
			{
				"id":"pasokon_2",
				"cat":"x0",
				"accent":"u"
			}
		]
};