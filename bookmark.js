javascript:(function(){
qresult="";
resultCount=0;
var cdkeys;

function startQuery()
{
    jQuery("table").remove();
    jQuery("input[name='cdkey']").remove();
    var str=jQuery("textarea").val();
    cdkeys=str.replace(/\n/g,"\r").split("\r");
    queryNext();
}

function queryNext()
{
    var element = cdkeys[resultCount];
    queryKey(element);
}

jQuery("#landingFooter").hide();
jQuery("input[name='cdkey']").hide();
jQuery("input[type='submit']").hide();
jQuery("form").after("<button id='MutiQuery' type='button' value='Query' onClick='startQuery()'> MutiQuery</button>");
jQuery("form").after("<textarea rows='10' cols='30' name='cdkeys'>");

function onCdkey(data)
{
    var admin=data.match(/<div class="AdminPageContent"[\s\S]*<!-- Footer -->/);
    var keyInput=admin[0].match(/<input.*>+?/);
    var tables=admin[0].match(/<table>[\s\S]+?<\/table>/g);
    var result="<br>"+keyInput+tables[0]/*+tables[1]*/;
    qresult+=result;
    resultCount++;
    printResult(result);
    if(resultCount<cdkeys.length)
        queryNext();
};

function queryKey(key)
{
    jQuery.get("https://partner.steamgames.com/querycdkey/cdkey?cdkey="+key,null,onCdkey);
}


function printResult(result)
{
    jQuery("#MutiQuery").after(result);
}

}()
)