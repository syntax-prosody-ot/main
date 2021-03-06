var sTreeNV_Tr = {
	"id":"TP",
	"cat":"invisible",
	"children":
		[
			{
				"id":"NP",
				"cat":"xp",
				"children":
					[
						{
							"id":"workers_0",
							"cat":"x0"
						}
					]
			},
			{
				"id":"Tbar",
				"cat":"xbar",
				"children":
					[
						{
							"id":"T",
							"cat":"x0",
							"silent":true
						},
						{
							"id":"VP",
							"cat":"xp",
							"children":
								[
									{
										"id":"helped_1",
										"cat":"x0"
									}
								]
						}
					]
			}
		]
};

var sTreeVNN_Tr = {
	"id":"TP",
	"cat":"invisible",
	"children":
		[
			{
				"id":"T",
				"cat":"x0",
				"silent":true
			},
			{
				"id":"vP",
				"cat":"xp",
				"children":
					[
						{
							"id":"show_0",
							"cat":"x0"
						},
						{
							"id":"VP",
							"cat":"invisible",
							"children":
								[
									{
										"id":"NP-IO",
										"cat":"xp",
										"children":
											[
												{
													"id":"workers_1",
													"cat":"x0"
												}
											]
									},
									{
										"id":"Vbar",
										"cat":"xbar",
										"children":
											[
												{
													"id":"Vtrace",
													"cat":"trace",
													"silent":true
												},
												{
													"id":"NP-DO",
													"cat":"xp",
													"children":
														[
															{
																"id":"dog_2",
																"cat":"x0"
															}
														]
												}
											]
									}
								]
						}
					]
			}
		]
};


var sTreeNAV_Tr = {
	"id":"TP",
	"cat":"invisible",
	"children":
		[
			{
				"id":"NP1",
				"cat":"invisible",
				"children":
					[
						{
							"id":"NP2",
							"cat":"xp",
							"children":
								[
									{
										"id":"workers_0",
										"cat":"x0"
									}
								]
						},
						{
							"id":"AP",
							"cat":"invisible",
							"children":
								[
									{
										"id":"mature_1",
										"cat":"x0"
									}
								]
						}
					]
			},
			{
				"id":"Tbar",
				"cat":"xbar",
				"children":
					[
						{
							"id":"T",
							"cat":"x0",
							"silent":true
						},
						{
							"id":"VP",
							"cat":"xp",
							"children":
								[
									{
										"id":"helped_2",
										"cat":"x0"
									}
								]
						}
					]
			}
		]
};

var sTreeVNNAdv_Tr = {
	"id":"TP",
	"cat":"invisible",
	"children":
		[
			{
				"id":"T",
				"cat":"x0",
				"silent":true
			},
			{
				"id":"vP1",
				"cat":"invisible",
				"children":
					[
						{
							"id":"vP2",
							"cat":"xp",
							"children":
								[
									{
										"id":"give_0",
										"cat":"x0"
									},
									{
										"id":"VP",
										"cat":"invisible",
										"children":
											[
												{
													"id":"NP-IO",
													"cat":"xp",
													"children":
														[
															{
																"id":"worker_1",
																"cat":"x0"
															}
														]
												},
												{
													"id":"Vbar",
													"cat":"xbar",
													"children":
														[
															{
																"id":"Vtrace",
																"cat":"trace",
																"silent":true
															},
															{
																"id":"NP-DO",
																"cat":"xp",
																"children":
																	[
																		{
																			"id":"chair_2",
																			"cat":"x0"
																		}
																	]
															}
														]
												}
											]
									}
								]
						},
						{
							"id":"AdvP",
							"cat":"invisible",
							"children":
								[
									{
										"id":"slowly_3",
										"cat":"x0"
									}
								]
						}
					]
			}
		]
};

var kinyamboTrees_Truckenbrodt = [sTreeNV_Tr, sTreeVNN_Tr, sTreeNAV_Tr, sTreeVNNAdv_Tr];

