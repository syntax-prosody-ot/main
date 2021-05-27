//Initialize category brackets to be used with parenthesizeTree (in case of modifications later on, this test will remain the same)
var compWordBrackets = {
    "i": "{}",
    "cp": "{}",
    "xp": "[]",
    "phi": "()",
    "x0": ["[","]"],
    "w": ["[", "]"],
    "clitic": ["",""],
    "syll": ["",""],
    "Ft": ["(F ", ")"],
    "u": ["{u ", "}"]
};

paren_ops = {parens: compWordBrackets};

//Initialize the options used in compound word Gen versions
var gen_ops_w_term_unary = {rootCategory: 'phi', recursiveCategory: 'phi-w', terminalCategory: 'w', noUnary:false};
var gen_ops_ft_term_unary = {rootCategory: 'phi', recursiveCategory: 'phi-w', terminalCategory: 'Ft', noUnary:false, obeysExhaustivity:false};
var gen_ops_w_term_noUnary = {rootCategory: 'phi', recursiveCategory: 'phi-w', terminalCategory: 'w', noUnary:true};
var gen_ops_ft_term_noUnary = {rootCategory: 'phi', recursiveCategory: 'phi-w', terminalCategory: 'Ft', noUnary:true, obeysExhaustivity:false};


//Initialize the expected arrays for compound word Gen versions and sort
var twoWordTerm = ["(a (b))","((a) b)","((a) (b))","(a b)","([a b])"];

var threeWordTerm = ["(((a) (b)) (c))"
,"(((a) (b)) c)"
,"(((a) b) (c))"
,"(((a) b) c)"
,"(([a b]) (c))"
,"(([a b]) c)"
,"((a (b)) (c))"
,"((a (b)) c)"
,"((a) ((b) (c)))"
,"((a) ((b) c))"
,"((a) ([b c]))"
,"((a) (b (c)))"
,"((a) (b) (c))"
,"((a) (b) c)"
,"((a) (b c))"
,"((a) [b c])"
,"((a) b (c))"
,"((a) b c)"
,"((a b) (c))"
,"((a b) c)"
,"([[a b] c])"
,"([a [b c]])"
,"([a b] (c))"
,"([a b] c)"
,"([a b c])"
,"(a ((b) (c)))"
,"(a ((b) c))"
,"(a ([b c]))"
,"(a (b (c)))"
,"(a (b) (c))"
,"(a (b) c)"
,"(a (b c))"
,"(a [b c])"
,"(a b (c))"
,"(a b c)"];

var twoFtTerm = ["([a.Ft b.Ft])"
,"([[a.Ft] [b.Ft]])"
,"([[a.Ft] b.Ft])"
,"([a.Ft [b.Ft]])"
,"(a.Ft b.Ft)"
,"(([a.Ft]) ([b.Ft]))"
,"(([a.Ft]) (b.Ft))"
,"(([a.Ft]) [b.Ft])"
,"(([a.Ft]) b.Ft)"
,"((a.Ft) ([b.Ft]))"
,"((a.Ft) (b.Ft))"
,"((a.Ft) [b.Ft])"
,"((a.Ft) b.Ft)"
,"([a.Ft] ([b.Ft]))"
,"([a.Ft] (b.Ft))"
,"([a.Ft] [b.Ft])"
,"([a.Ft] b.Ft)"
,"(a.Ft ([b.Ft]))"
,"(a.Ft (b.Ft))"
,"(a.Ft [b.Ft])"];

//Array collected from enumerateThreeFtTerm function below
var threeFtTerm = ["((([a.Ft]) ([b.Ft])) ([c.Ft]))","((([a.Ft]) ([b.Ft])) (c.Ft))","((([a.Ft]) ([b.Ft])) [c.Ft])","((([a.Ft]) ([b.Ft])) c.Ft)","((([a.Ft]) (b.Ft)) ([c.Ft]))","((([a.Ft]) (b.Ft)) (c.Ft))","((([a.Ft]) (b.Ft)) [c.Ft])","((([a.Ft]) (b.Ft)) c.Ft)","((([a.Ft]) [b.Ft]) ([c.Ft]))","((([a.Ft]) [b.Ft]) (c.Ft))","((([a.Ft]) [b.Ft]) [c.Ft])","((([a.Ft]) [b.Ft]) c.Ft)","((([a.Ft]) b.Ft) ([c.Ft]))","((([a.Ft]) b.Ft) (c.Ft))","((([a.Ft]) b.Ft) [c.Ft])","((([a.Ft]) b.Ft) c.Ft)","(((a.Ft) ([b.Ft])) ([c.Ft]))","(((a.Ft) ([b.Ft])) (c.Ft))","(((a.Ft) ([b.Ft])) [c.Ft])","(((a.Ft) ([b.Ft])) c.Ft)","(((a.Ft) (b.Ft)) ([c.Ft]))","(((a.Ft) (b.Ft)) (c.Ft))","(((a.Ft) (b.Ft)) [c.Ft])","(((a.Ft) (b.Ft)) c.Ft)","(((a.Ft) [b.Ft]) ([c.Ft]))","(((a.Ft) [b.Ft]) (c.Ft))","(((a.Ft) [b.Ft]) [c.Ft])","(((a.Ft) [b.Ft]) c.Ft)","(((a.Ft) b.Ft) ([c.Ft]))","(((a.Ft) b.Ft) (c.Ft))","(((a.Ft) b.Ft) [c.Ft])","(((a.Ft) b.Ft) c.Ft)","(([[a.Ft] [b.Ft]]) ([c.Ft]))","(([[a.Ft] [b.Ft]]) (c.Ft))","(([[a.Ft] [b.Ft]]) [c.Ft])","(([[a.Ft] [b.Ft]]) c.Ft)","(([[a.Ft] b.Ft]) ([c.Ft]))","(([[a.Ft] b.Ft]) (c.Ft))","(([[a.Ft] b.Ft]) [c.Ft])","(([[a.Ft] b.Ft]) c.Ft)","(([a.Ft [b.Ft]]) ([c.Ft]))","(([a.Ft [b.Ft]]) (c.Ft))","(([a.Ft [b.Ft]]) [c.Ft])","(([a.Ft [b.Ft]]) c.Ft)","(([a.Ft b.Ft]) ([c.Ft]))","(([a.Ft b.Ft]) (c.Ft))","(([a.Ft b.Ft]) [c.Ft])","(([a.Ft b.Ft]) c.Ft)","(([a.Ft] ([b.Ft])) ([c.Ft]))","(([a.Ft] ([b.Ft])) (c.Ft))","(([a.Ft] ([b.Ft])) [c.Ft])","(([a.Ft] ([b.Ft])) c.Ft)","(([a.Ft] (b.Ft)) ([c.Ft]))","(([a.Ft] (b.Ft)) (c.Ft))","(([a.Ft] (b.Ft)) [c.Ft])","(([a.Ft] (b.Ft)) c.Ft)","(([a.Ft] [b.Ft]) ([c.Ft]))","(([a.Ft] [b.Ft]) (c.Ft))","(([a.Ft] [b.Ft]) [c.Ft])","(([a.Ft] [b.Ft]) c.Ft)","(([a.Ft] b.Ft) ([c.Ft]))","(([a.Ft] b.Ft) (c.Ft))","(([a.Ft] b.Ft) [c.Ft])","(([a.Ft] b.Ft) c.Ft)","(([a.Ft]) (([b.Ft]) ([c.Ft])))","(([a.Ft]) (([b.Ft]) (c.Ft)))","(([a.Ft]) (([b.Ft]) [c.Ft]))","(([a.Ft]) (([b.Ft]) c.Ft))","(([a.Ft]) ((b.Ft) ([c.Ft])))","(([a.Ft]) ((b.Ft) (c.Ft)))","(([a.Ft]) ((b.Ft) [c.Ft]))","(([a.Ft]) ((b.Ft) c.Ft))","(([a.Ft]) ([[b.Ft] [c.Ft]]))","(([a.Ft]) ([[b.Ft] c.Ft]))","(([a.Ft]) ([b.Ft [c.Ft]]))","(([a.Ft]) ([b.Ft c.Ft]))","(([a.Ft]) ([b.Ft] ([c.Ft])))","(([a.Ft]) ([b.Ft] (c.Ft)))","(([a.Ft]) ([b.Ft] [c.Ft]))","(([a.Ft]) ([b.Ft] c.Ft))","(([a.Ft]) ([b.Ft]) ([c.Ft]))","(([a.Ft]) ([b.Ft]) (c.Ft))","(([a.Ft]) ([b.Ft]) [c.Ft])","(([a.Ft]) ([b.Ft]) c.Ft)","(([a.Ft]) (b.Ft ([c.Ft])))","(([a.Ft]) (b.Ft (c.Ft)))","(([a.Ft]) (b.Ft [c.Ft]))","(([a.Ft]) (b.Ft c.Ft))","(([a.Ft]) (b.Ft) ([c.Ft]))","(([a.Ft]) (b.Ft) (c.Ft))","(([a.Ft]) (b.Ft) [c.Ft])","(([a.Ft]) (b.Ft) c.Ft)","(([a.Ft]) [[b.Ft] [c.Ft]])","(([a.Ft]) [[b.Ft] c.Ft])","(([a.Ft]) [b.Ft [c.Ft]])","(([a.Ft]) [b.Ft c.Ft])","(([a.Ft]) [b.Ft] ([c.Ft]))","(([a.Ft]) [b.Ft] (c.Ft))","(([a.Ft]) [b.Ft] [c.Ft])","(([a.Ft]) [b.Ft] c.Ft)","(([a.Ft]) b.Ft ([c.Ft]))","(([a.Ft]) b.Ft (c.Ft))","(([a.Ft]) b.Ft [c.Ft])","(([a.Ft]) b.Ft c.Ft)","((a.Ft ([b.Ft])) ([c.Ft]))","((a.Ft ([b.Ft])) (c.Ft))","((a.Ft ([b.Ft])) [c.Ft])","((a.Ft ([b.Ft])) c.Ft)","((a.Ft (b.Ft)) ([c.Ft]))","((a.Ft (b.Ft)) (c.Ft))","((a.Ft (b.Ft)) [c.Ft])","((a.Ft (b.Ft)) c.Ft)","((a.Ft [b.Ft]) ([c.Ft]))","((a.Ft [b.Ft]) (c.Ft))","((a.Ft [b.Ft]) [c.Ft])","((a.Ft [b.Ft]) c.Ft)","((a.Ft b.Ft) ([c.Ft]))","((a.Ft b.Ft) (c.Ft))","((a.Ft b.Ft) [c.Ft])","((a.Ft b.Ft) c.Ft)","((a.Ft) (([b.Ft]) ([c.Ft])))","((a.Ft) (([b.Ft]) (c.Ft)))","((a.Ft) (([b.Ft]) [c.Ft]))","((a.Ft) (([b.Ft]) c.Ft))","((a.Ft) ((b.Ft) ([c.Ft])))","((a.Ft) ((b.Ft) (c.Ft)))","((a.Ft) ((b.Ft) [c.Ft]))","((a.Ft) ((b.Ft) c.Ft))","((a.Ft) ([[b.Ft] [c.Ft]]))","((a.Ft) ([[b.Ft] c.Ft]))","((a.Ft) ([b.Ft [c.Ft]]))","((a.Ft) ([b.Ft c.Ft]))","((a.Ft) ([b.Ft] ([c.Ft])))","((a.Ft) ([b.Ft] (c.Ft)))","((a.Ft) ([b.Ft] [c.Ft]))","((a.Ft) ([b.Ft] c.Ft))","((a.Ft) ([b.Ft]) ([c.Ft]))","((a.Ft) ([b.Ft]) (c.Ft))","((a.Ft) ([b.Ft]) [c.Ft])","((a.Ft) ([b.Ft]) c.Ft)","((a.Ft) (b.Ft ([c.Ft])))","((a.Ft) (b.Ft (c.Ft)))","((a.Ft) (b.Ft [c.Ft]))","((a.Ft) (b.Ft c.Ft))","((a.Ft) (b.Ft) ([c.Ft]))","((a.Ft) (b.Ft) (c.Ft))","((a.Ft) (b.Ft) [c.Ft])","((a.Ft) (b.Ft) c.Ft)","((a.Ft) [[b.Ft] [c.Ft]])","((a.Ft) [[b.Ft] c.Ft])","((a.Ft) [b.Ft [c.Ft]])","((a.Ft) [b.Ft c.Ft])","((a.Ft) [b.Ft] ([c.Ft]))","((a.Ft) [b.Ft] (c.Ft))","((a.Ft) [b.Ft] [c.Ft])","((a.Ft) [b.Ft] c.Ft)","((a.Ft) b.Ft ([c.Ft]))","((a.Ft) b.Ft (c.Ft))","((a.Ft) b.Ft [c.Ft])","((a.Ft) b.Ft c.Ft)","([[[a.Ft] [b.Ft]] [c.Ft]])","([[[a.Ft] [b.Ft]] c.Ft])","([[[a.Ft] b.Ft] [c.Ft]])","([[[a.Ft] b.Ft] c.Ft])","([[a.Ft [b.Ft]] [c.Ft]])","([[a.Ft [b.Ft]] c.Ft])","([[a.Ft b.Ft] [c.Ft]])","([[a.Ft b.Ft] c.Ft])","([[a.Ft] [[b.Ft] [c.Ft]]])","([[a.Ft] [[b.Ft] c.Ft]])","([[a.Ft] [b.Ft [c.Ft]]])","([[a.Ft] [b.Ft c.Ft]])","([[a.Ft] [b.Ft] [c.Ft]])","([[a.Ft] [b.Ft] c.Ft])","([[a.Ft] [b.Ft]] ([c.Ft]))","([[a.Ft] [b.Ft]] (c.Ft))","([[a.Ft] [b.Ft]] [c.Ft])","([[a.Ft] [b.Ft]] c.Ft)","([[a.Ft] b.Ft [c.Ft]])","([[a.Ft] b.Ft c.Ft])","([[a.Ft] b.Ft] ([c.Ft]))","([[a.Ft] b.Ft] (c.Ft))","([[a.Ft] b.Ft] [c.Ft])","([[a.Ft] b.Ft] c.Ft)","([a.Ft [[b.Ft] [c.Ft]]])","([a.Ft [[b.Ft] c.Ft]])","([a.Ft [b.Ft [c.Ft]]])","([a.Ft [b.Ft c.Ft]])","([a.Ft [b.Ft] [c.Ft]])","([a.Ft [b.Ft] c.Ft])","([a.Ft [b.Ft]] ([c.Ft]))","([a.Ft [b.Ft]] (c.Ft))","([a.Ft [b.Ft]] [c.Ft])","([a.Ft [b.Ft]] c.Ft)","([a.Ft b.Ft [c.Ft]])","([a.Ft b.Ft c.Ft])","([a.Ft b.Ft] ([c.Ft]))","([a.Ft b.Ft] (c.Ft))","([a.Ft b.Ft] [c.Ft])","([a.Ft b.Ft] c.Ft)","([a.Ft] (([b.Ft]) ([c.Ft])))","([a.Ft] (([b.Ft]) (c.Ft)))","([a.Ft] (([b.Ft]) [c.Ft]))","([a.Ft] (([b.Ft]) c.Ft))","([a.Ft] ((b.Ft) ([c.Ft])))","([a.Ft] ((b.Ft) (c.Ft)))","([a.Ft] ((b.Ft) [c.Ft]))","([a.Ft] ((b.Ft) c.Ft))","([a.Ft] ([[b.Ft] [c.Ft]]))","([a.Ft] ([[b.Ft] c.Ft]))","([a.Ft] ([b.Ft [c.Ft]]))","([a.Ft] ([b.Ft c.Ft]))","([a.Ft] ([b.Ft] ([c.Ft])))","([a.Ft] ([b.Ft] (c.Ft)))","([a.Ft] ([b.Ft] [c.Ft]))","([a.Ft] ([b.Ft] c.Ft))","([a.Ft] ([b.Ft]) ([c.Ft]))","([a.Ft] ([b.Ft]) (c.Ft))","([a.Ft] ([b.Ft]) [c.Ft])","([a.Ft] ([b.Ft]) c.Ft)","([a.Ft] (b.Ft ([c.Ft])))","([a.Ft] (b.Ft (c.Ft)))","([a.Ft] (b.Ft [c.Ft]))","([a.Ft] (b.Ft c.Ft))","([a.Ft] (b.Ft) ([c.Ft]))","([a.Ft] (b.Ft) (c.Ft))","([a.Ft] (b.Ft) [c.Ft])","([a.Ft] (b.Ft) c.Ft)","([a.Ft] [[b.Ft] [c.Ft]])","([a.Ft] [[b.Ft] c.Ft])","([a.Ft] [b.Ft [c.Ft]])","([a.Ft] [b.Ft c.Ft])","([a.Ft] [b.Ft] ([c.Ft]))","([a.Ft] [b.Ft] (c.Ft))","([a.Ft] [b.Ft] [c.Ft])","([a.Ft] [b.Ft] c.Ft)","([a.Ft] b.Ft ([c.Ft]))","([a.Ft] b.Ft (c.Ft))","([a.Ft] b.Ft [c.Ft])","([a.Ft] b.Ft c.Ft)","(a.Ft (([b.Ft]) ([c.Ft])))","(a.Ft (([b.Ft]) (c.Ft)))","(a.Ft (([b.Ft]) [c.Ft]))","(a.Ft (([b.Ft]) c.Ft))","(a.Ft ((b.Ft) ([c.Ft])))","(a.Ft ((b.Ft) (c.Ft)))","(a.Ft ((b.Ft) [c.Ft]))","(a.Ft ((b.Ft) c.Ft))","(a.Ft ([[b.Ft] [c.Ft]]))","(a.Ft ([[b.Ft] c.Ft]))","(a.Ft ([b.Ft [c.Ft]]))","(a.Ft ([b.Ft c.Ft]))","(a.Ft ([b.Ft] ([c.Ft])))","(a.Ft ([b.Ft] (c.Ft)))","(a.Ft ([b.Ft] [c.Ft]))","(a.Ft ([b.Ft] c.Ft))","(a.Ft ([b.Ft]) ([c.Ft]))","(a.Ft ([b.Ft]) (c.Ft))","(a.Ft ([b.Ft]) [c.Ft])","(a.Ft ([b.Ft]) c.Ft)","(a.Ft (b.Ft ([c.Ft])))","(a.Ft (b.Ft (c.Ft)))","(a.Ft (b.Ft [c.Ft]))","(a.Ft (b.Ft c.Ft))","(a.Ft (b.Ft) ([c.Ft]))","(a.Ft (b.Ft) (c.Ft))","(a.Ft (b.Ft) [c.Ft])","(a.Ft (b.Ft) c.Ft)","(a.Ft [[b.Ft] [c.Ft]])","(a.Ft [[b.Ft] c.Ft])","(a.Ft [b.Ft [c.Ft]])","(a.Ft [b.Ft c.Ft])","(a.Ft [b.Ft] ([c.Ft]))","(a.Ft [b.Ft] (c.Ft))","(a.Ft [b.Ft] [c.Ft])","(a.Ft [b.Ft] c.Ft)","(a.Ft b.Ft ([c.Ft]))","(a.Ft b.Ft (c.Ft))","(a.Ft b.Ft [c.Ft])","(a.Ft b.Ft c.Ft)"];

var twoWordTerm_noUnary = ['([a b])','(a b)'];
var threeWordTerm_noUnary = ['([[a b] c])','([a [b c]])','([a b c])','((a b) c)','([a b] c)','(a [b c])','(a (b c))','(a b c)'];
var twoFtTerm_noUnary = ['(a.Ft b.Ft)','([a.Ft b.Ft])'];
var threeFtTerm_noUnary = ['([[a.Ft b.Ft] c.Ft])','([a.Ft [b.Ft c.Ft]])','([a.Ft b.Ft c.Ft])','((a.Ft b.Ft) c.Ft)','([a.Ft b.Ft] c.Ft)','(a.Ft [b.Ft c.Ft])','(a.Ft (b.Ft c.Ft))','(a.Ft b.Ft c.Ft)'];

//Initialize threeFtTerm trees based on threeWordTerm trees. threeFtTerm contains 8 times as
//many trees as threeWordTerm. 

//dec2bin code modified from:
//https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
//Specialized to make sure there are at least three 1's and 0's in the returned string.  May be modified to enumerate ptrees for higher terminal counts.
function dec2bin(dec) {
    dec = (dec >>> 0).toString(2);
    while(true){
        if(dec.length < 3){
            dec = "0".concat(dec);
        }else{
            break
        }
    };
    return dec;
};


//Splices in 'item' just after instr[index]
function strSplice(instr,index,item){
    index = index+1;
    var outstring = instr.slice(0,index);
    var r_str = instr.slice(index);
    outstring = outstring.concat(item);
    return outstring.concat(r_str);
};

//Following function was used to create the array in the threeFtTerm variable above.
//Maps all binary numbers from 0-8 (i.e. 000,001,010,011...) onto 'a' 'b' and 'c' terminals.  Every terminal is also given the '.Ft' marker.
//The flagged foot terminals will be unarily embedded in a word.  This creates 8 ptrees from each ptree in threeWordTerm.

/*
function enumerateThreeFtTerm(threeWordTerm){
    var threeFtTerm = [];
    var binMap = "";
    var threeWordTermCopy = threeWordTerm;
    for(var i = 0; i < threeWordTerm.length; i++){
        for(var k = 0; k < 8; k++){
            threeWordTermCopy = [...threeWordTerm];
            binMap = dec2bin(k);
            var char = 0;
            var a_done = false;
            var b_done = false;
            var c_done = false;
            while(char < threeWordTermCopy[i].length){
                if(threeWordTermCopy[i][char] == 'a' && !a_done){
                    if(binMap[0]=="1"){
                        threeWordTermCopy[i] = strSplice(threeWordTermCopy[i],char,"]");
                        threeWordTermCopy[i] = strSplice(threeWordTermCopy[i],char-1,"[");
                        char++;
                    };
                    threeWordTermCopy[i] = strSplice(threeWordTermCopy[i],char,".Ft");
                };
                if(threeWordTermCopy[i][char] == 'b'){
                    if(binMap[1]=="1"){
                        threeWordTermCopy[i] = strSplice(threeWordTermCopy[i],char,"]");
                        threeWordTermCopy[i] = strSplice(threeWordTermCopy[i],char-1,"[");
                        char++;
                    };
                    threeWordTermCopy[i] = strSplice(threeWordTermCopy[i],char,".Ft");
                };
                if(threeWordTermCopy[i][char] == 'c'){
                    if(binMap[2]=="1"){
                        threeWordTermCopy[i] = strSplice(threeWordTermCopy[i],char,"]");
                        threeWordTermCopy[i] = strSplice(threeWordTermCopy[i],char-1,"[");
                        char++
                    };
                    threeWordTermCopy[i] = strSplice(threeWordTermCopy[i],char,".Ft");
                };
                char++;
            };
            threeFtTerm = threeFtTerm.concat(threeWordTermCopy[i]);
        };
    };
    return threeFtTerm.sort();
};
*/

//Initialize the arrays made from the output of compound word Gen versions

//Two word terminals, unary allowed
//Disorganized gen output
var rawgen_twoWordTerm = GEN({}, 'a b', gen_ops_w_term_unary);

//Empty array to take in parenthesized trees
var gen_twoWordTerm = [];
for(i=0; i < rawgen_twoWordTerm.length; i++){
    gen_twoWordTerm.push(parenthesizeTree(rawgen_twoWordTerm[i][1], paren_ops));
};

//Three word terminals, unary allowed
var rawgen_threeWordTerm = GEN({}, 'a b c', gen_ops_w_term_unary);
var gen_threeWordTerm = [];
for(i=0; i < rawgen_threeWordTerm.length; i++){
    gen_threeWordTerm.push(parenthesizeTree(rawgen_threeWordTerm[i][1], paren_ops));
};

//Two foot terminals, unary allowed
var rawgen_twoFtTerm = GEN({}, 'a b', gen_ops_ft_term_unary);
var gen_twoFtTerm = []
for(i=0; i < rawgen_twoFtTerm.length; i++){
    gen_twoFtTerm.push(parenthesizeTree(rawgen_twoFtTerm[i][1], paren_ops));
};

//Three foot terminals, unary allowed
var rawgen_threeFtTerm = GEN({}, 'a b c', gen_ops_ft_term_unary);
var gen_threeFtTerm = []
for(i=0; i < rawgen_threeFtTerm.length; i++){
    gen_threeFtTerm.push(parenthesizeTree(rawgen_threeFtTerm[i][1], paren_ops));
};
gen_threeFtTermCopy = [...gen_threeFtTerm];


//Two word terminals, no unary branching
var rawgen_twoWordTerm_noUnary = GEN({}, 'a b', gen_ops_w_term_noUnary);
var gen_twoWordTerm_noUnary = [];
for(i=0; i < rawgen_twoWordTerm_noUnary.length; i++){
    gen_twoWordTerm_noUnary.push(parenthesizeTree(rawgen_twoWordTerm_noUnary[i][1], paren_ops));
};

//Three word terminals, no unary branching
var rawgen_threeWordTerm_noUnary = GEN({}, 'a b c', gen_ops_w_term_noUnary);
var gen_threeWordTerm_noUnary = [];
for(i=0; i < rawgen_threeWordTerm_noUnary.length; i++){
    gen_threeWordTerm_noUnary.push(parenthesizeTree(rawgen_threeWordTerm_noUnary[i][1], paren_ops));
};

//Two foot terminals, no unary branching
var rawgen_twoFtTerm_noUnary = GEN({}, 'a b', gen_ops_ft_term_noUnary);
var gen_twoFtTerm_noUnary = []
for(i=0; i < rawgen_twoFtTerm_noUnary.length; i++){
    gen_twoFtTerm_noUnary.push(parenthesizeTree(rawgen_twoFtTerm_noUnary[i][1], paren_ops));
};

//Three foot terminals, no unary branching
var rawgen_threeFtTerm_noUnary = GEN({}, 'a b c', gen_ops_ft_term_noUnary);
var gen_threeFtTerm_noUnary = []
for(i=0; i < rawgen_threeFtTerm_noUnary.length; i++){
    gen_threeFtTerm_noUnary.push(parenthesizeTree(rawgen_threeFtTerm_noUnary[i][1], paren_ops));
};
gen_threeFtTermCopy_noUnary = [...gen_threeFtTerm_noUnary];

//The following commands reveals that the Gen function (on May 12, 2021) does not properly enumerate the possible trees with three foot-terminals and the options in gen_ops_ft_term.
//console.log(gen_threeFtTermCopy);
//console.log(new Set(gen_threeFtTermCopy));

//Function counts the duplicate values in an array
function count_duplicate(observed){
        var counts = {};
        var duplicated = [];

        for(var i =0; i < observed.length; i++){ 
             if (counts[observed[i]]){
             counts[observed[i]] += 1
             } else {
             counts[observed[i]] = 1
             }
        }
        var keys = Object.keys(counts);
        for (var i = 0; i<keys.length; i++){
            if (counts[keys[i]] >= 2){
                duplicated = duplicated.concat(keys[i]);
                console.log(keys[i] + " counted: " + counts[keys[i]] + " times.")
            }
        }

        return duplicated;
    }

//Function returns an array of which the first value is an array of unobserved but expected items and the second value is an array of overgenerated items. 
function exp_vs_obs_trees(observed, expected){
    var unobserved = expected.filter(function(x) { return observed.indexOf(x) < 0 });
    var overgenerated = observed.filter(function(x) {return expected.indexOf(x) < 0});
    var duplicated = count_duplicate(observed);


    return [unobserved, overgenerated, duplicated];
};


//Takes in two arrays, observed values as expected values, and returns an error msg about undergeneration and overgeneration.
function compareSetErrorMsg(observed, expected){
    var triplet = exp_vs_obs_trees(observed,expected);
    var unobserved = triplet[0];
    var overgenerated = triplet[1];
    var duplicated = triplet[2];

    var out_string = "There are "+JSON.stringify(unobserved.length)+" ptrees unobserved in GEN's output, "+JSON.stringify(overgenerated.length)+" overgenerated ptrees in GEN's output, and "+JSON.stringify(duplicated.length)+" duplicated ptrees in GEN's output. ";
    if(unobserved.length > 2){
        out_string = out_string.concat("\nThe unobserved ptrees include: \n"+JSON.stringify(unobserved[0])+"\n"+JSON.stringify(unobserved[1])+"\n"+JSON.stringify(unobserved[2]));
    };
    if(overgenerated.length > 2){
        out_string = out_string.concat("\nThe overgenerated ptrees include: \n"+JSON.stringify(overgenerated[2])+"\n"+JSON.stringify(overgenerated[2])+"\n"+JSON.stringify(overgenerated[2]));
    };
    if(duplicated.length > 2){
        out_string = out_string.concat("\nThe duplicated ptrees include: \n"+JSON.stringify(duplicated[0])+"\n"+JSON.stringify(duplicated[1])+"\n"+JSON.stringify(duplicated[2])+'\n');
    }
    return out_string;
};




//Mocha Tests
function compoundWordGenTests(){
    describe('Tests for compund-word Gen allowing unary branches', function() {
        it('Recursive w + phi for two words', function() {
            assert.equal(JSON.stringify(gen_twoWordTerm.sort()), JSON.stringify(twoWordTerm.sort()), compareSetErrorMsg(gen_twoWordTerm,twoWordTerm));
        });
        it('Recursive w + phi for three words', function() {
            assert.equal(JSON.stringify(gen_threeWordTerm.sort()), JSON.stringify(threeWordTerm.sort()), compareSetErrorMsg(gen_threeWordTerm,threeWordTerm));
        });
        it('Recursive w + phi with foot terminals for two words', function() {
            assert.equal(JSON.stringify(gen_twoFtTerm.sort()), JSON.stringify(twoFtTerm.sort()), compareSetErrorMsg(gen_twoFtTerm,twoFtTerm));
        });
        it('Recursive w + phi with foot terminals for three words', function() {
            assert.equal(JSON.stringify(gen_threeFtTerm.sort()), JSON.stringify(threeFtTerm.sort()), compareSetErrorMsg(gen_threeFtTerm,threeFtTerm));
        });
    });
    describe('Tests for compund-word Gen disallowing unary branches', function() {
        it('Recursive w + phi for two words', function() {
            assert.equal(JSON.stringify(gen_twoWordTerm_noUnary.sort()), JSON.stringify(twoWordTerm_noUnary.sort()), compareSetErrorMsg(gen_twoWordTerm_noUnary,twoWordTerm_noUnary));
        });
        it('Recursive w + phi for three words', function() {
            assert.equal(JSON.stringify(gen_threeWordTerm_noUnary.sort()), JSON.stringify(threeWordTerm_noUnary.sort()), compareSetErrorMsg(gen_threeWordTerm_noUnary,threeWordTerm_noUnary));
        });
        it('Recursive w + phi with foot terminals for two words', function() {
            assert.equal(JSON.stringify(gen_twoFtTerm_noUnary.sort()), JSON.stringify(twoFtTerm_noUnary.sort()), compareSetErrorMsg(gen_twoFtTerm_noUnary,twoFtTerm_noUnary));
        });
        it('Recursive w + phi with foot terminals for three words', function() {
            assert.equal(JSON.stringify(gen_threeFtTerm_noUnary.sort()), JSON.stringify(threeFtTerm_noUnary.sort()), compareSetErrorMsg(gen_threeFtTerm_noUnary,threeFtTerm_noUnary));
        });
    });
};
