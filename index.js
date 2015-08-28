var abbreviations=require('./data/abbrs.json')


module.exports = function(statement) {
  
    var keys=Object.keys(abbreviations),
        pat=new RegExp( '\\b('+ escapeRegExp(keys.join('|')) +')\\b','ig' ),
        matches=statement.match(pat),
        parsed={
            abbrs:[],
            string:{
                in:statement,
                out:statement+'',
                annotated:statement+''
            }
        };


    //replace
    matches.forEach(function(abbr){
        pat=new RegExp('\\b'+ escapeRegExp(abbr) +'\\b','g');
        parsed.string.out=parsed.string.out.replace(pat,abbreviations[abbr.toLowerCase()]);
        parsed.string.annotated=parsed.string.annotated.replace(pat,'{ABBR: '+abbreviations[abbr.toLowerCase()]+'}');
        parsed.abbrs.push(abbr)
    });


    return parsed;
};


function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$]/g, "\\$&");
}