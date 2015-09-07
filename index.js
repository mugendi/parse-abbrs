
var abbreviations=require('./data/abbrs.json')


module.exports = function(statement) {
  
    // First we replace all non case-sensitive abbreviations
    var keys=Object.keys(abbreviations.non_sensitive),
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

    if(matches){
         //replace
        matches.forEach(function(abbr){
            pat=new RegExp('\\b'+ escapeRegExp(abbr) +'\\b','g');
            parsed.string.out=parsed.string.out.replace(pat,abbreviations.non_sensitive[abbr.toLowerCase()]);
            parsed.string.annotated=parsed.string.annotated.replace(pat,'{ABBR: '+abbreviations.non_sensitive[abbr.toLowerCase()]+'}');
            parsed.abbrs.push(abbr)
        });    
    }


    // Then we deal with the case sensitive abbreviations
    var keys=Object.keys(abbreviations.sensitive),
        pat=new RegExp( '\\b('+ escapeRegExp(keys.join('|')) +')\\b','g' ),
        matches=statement.match(pat);

    // console.log(matches)
    if(matches){
         //replace
        matches.forEach(function(abbr){
            pat=new RegExp('\\b'+ escapeRegExp(abbr) +'\\b','g');
            parsed.string.out=parsed.string.out.replace(pat,abbreviations.sensitive[abbr]);
            parsed.string.annotated=parsed.string.annotated.replace(pat,'{ABBR: '+abbreviations.sensitive[abbr]+'}');
            parsed.abbrs.push(abbr)
        });    
    }

   

    return parsed;
};


function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$]/g, "\\$&");
}