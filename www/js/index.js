
var open_app_version = "1.7";

document.location.href = document.location.href.split("#")[0] + "#";

if (localStorage.getItem("myColorText"))
{
	document.getElementById("loading_div").style.color = localStorage.getItem("myColorText");
}
if (localStorage.getItem("myColorBackground"))
{
	document.getElementById("loading_div").style.backgroundColor = localStorage.getItem("myColorBackground");
	document.body.style.backgroundColor = localStorage.getItem("myColorBackground");
}

window.addEventListener("scroll", function()
{
	if (document.getElementById("menu_div").style.display == "none") localStorage.setItem("myScrollTop", document.body.scrollTop);
});

var open_first_load = true;

var open_english_array = [];
var open_web_array = [];
var open_hebrew_array = [];
var open_greek_array = [];
var open_latin_array = [];

var open_greek_count_array = [];
var open_greek_roots_array = [];
var open_greek_translations_array = [];

var open_latin_id_array = [];
var open_latin_count_array = [];
var open_latin_roots_array = [];
var open_latin_translations_array = [];

var open_gloss_view_array = [];
var open_gloss_trans_array = [];

var open_latin_gloss_word_count = 30;

var open_external_string = { value: "" };
var open_external_inner_interval = null;
var open_external_loop_interval = null;
var open_external_stage = 0;

var open_search_text_interval = null;

var open_current_mode = "english_nt";
var open_current_book = 0;
var open_current_chapter = 1;
var open_current_verse = 1;

var open_current_hebrew = [];
var open_current_greek = [];
var open_current_latin = [];
var open_current_polytonic = [];
var open_current_transliteration = [];
var open_current_strongs = [];
var open_current_parsing = [];
var open_current_english = [];
var open_current_web = [];
var open_current_root = [];

var open_options_popup_width = 200; // amount of pixels the popup must be at minimum
var open_options_english_font = 14; // size of font in pixels
var open_options_hebrew_font = 16; // size of font in pixels
var open_options_greek_font = 16; // size of font in pixels
var open_options_latin_font = 16; // size of font in pixels
var open_options_gloss_font = 10; // size of font in pixels
var open_options_popup_font = 12; // size of font in pixels
var open_options_menu_font = 20; // size of font in pixels, no longer an option to change
var open_options_text_color = "black";
var open_options_jesus_color = "red";
var open_options_background_color = "white";
var open_options_greek_polytonic = "yes";

var open_flag_greek_data_loaded = false;
var open_flag_latin_data_loaded = false;

var open_ot_name_listing = [
	"Genesis",
	"Exodus",
	"Leviticus",
	"Numbers",
	"Deuteronomy",
	"Joshua",
	"Judges",
	"Ruth",
	"1 Samuel",
	"2 Samuel",
	"1 Kings",
	"2 Kings",
	"1 Chronicles",
	"2 Chronicles",
	"Ezra",
	"Nehemiah",
	"Esther",
	"Job",
	"Psalms",
	"Proverbs",
	"Ecclesiastes",
	"Song Of Solomon",
	"Isaiah",
	"Jeremiah",
	"Lamentations",
	"Ezekiel",
	"Daniel",
	"Hosea",
	"Joel",
	"Amos",
	"Obadiah",
	"Jonah",
	"Micah",
	"Nahum",
	"Habakkuk",
	"Zephaniah",
	"Haggai",
	"Zechariah",
	"Malachi"
];

var open_ot_range_listing = [
	50,
	40,
	27,
	36,
	34,
	24,
	21,
	4,
	31,
	24,
	22,
	25,
	29,
	36,
	10,
	13,
	10,
	42,
	150,
	31,
	12,
	8,
	66,
	52,
	5,
	48,
	12,
	14,
	3,
	9,
	1,
	4,
	7,
	3,
	3,
	3,
	2,
	14,
	4
];

var open_nt_name_listing = [
	"Matthew",
	"Mark",
	"Luke",
	"John",
	"Acts",
	"Romans",
	"1 Corinthians",
	"2 Corinthians",
	"Galatians",
	"Ephesians",
	"Philippians",
	"Colossians",
	"1 Thessalonians",
	"2 Thessalonians",
	"1 Timothy",
	"2 Timothy",
	"Titus",
	"Philemon",
	"Hebrews",
	"James",
	"1 Peter",
	"2 Peter",
	"1 John",
	"2 John",
	"3 John",
	"Jude",
	"Revelation"
];

var open_nt_range_listing = [
	28,
	16,
	24,
	21,
	28,
	16,
	16,
	13,
	6,
	6,
	4,
	4,
	5,
	3,
	6,
	4,
	3,
	1,
	13,
	5,
	5,
	3,
	5,
	1,
	1,
	1,
	22
];

var open_greek_polytonic_html_replacement = [

	"`>a|", "&#8066;",
	"`<a|", "&#8067;",
	"'>a|", "&#8068;",
	"'<a|", "&#8069;",
	"\\~>a|", "&#8070;",
	"\\~<a|", "&#8071;",
	">a|", "&#8064;",
	"<a|", "&#8065;",

	"`a|", "&#8114;",
	"'a|", "&#8116;",
	"\\~a|", "&#8119;",
	"a|", "&#8115;",

	"a\"", "&#8113;", // bad replacement

	"`>a", "&#7938;",
	"`<a", "&#7939;",
	"'>a", "&#7940;",
	"'<a", "&#7941;",
	"\\~>a", "&#7942;",
	"\\~<a", "&#7943;",
	">a", "&#7936;",
	"<a", "&#7937;",

	"`a", "&#8048;",
	"'a", "&#8049;",
	"\\~a", "&#8118;",
	"a", "&#945;",

	"`>e", "&#7954;",
	"`<e", "&#7955;",
	"'>e", "&#7956;",
	"'<e", "&#7957;",
	">e", "&#7952;",
	"<e", "&#7953;",

	"`e", "&#8050;",
	"'e", "&#8051;",
	"e", "&#949;",

	"`>h|", "&#8082;",
	"`<h|", "&#8083;",
	"'>h|", "&#8084;",
	"'<h|", "&#8085;",
	"\\~>h|", "&#8086;",
	"\\~<h|", "&#8087;",
	">h|", "&#8080;",
	"<h|", "&#8081;",

	"`h|", "&#8130;",
	"'h|", "&#8132;",
	"\\~h|", "&#8135;",
	"h|", "&#8131;",

	"`>h", "&#7970;",
	"`<h", "&#7971;",
	"'>h", "&#7972;",
	"'<h", "&#7973;",
	"\\~>h", "&#7974;",
	"\\~<h", "&#7975;",
	">h", "&#7968;",
	"<h", "&#7969;",

	"`h", "&#8052;",
	"'h", "&#8053;",
	"\\~h", "&#8134;",
	"h", "&#951;",

	"`>i", "&#7986;",
	"`<i", "&#7987;",
	"'>i", "&#7988;",
	"'<i", "&#7989;",
	"\\~>i", "&#7990;",
	"\\~<i", "&#7991;",
	">i", "&#7984;",
	"<i", "&#7985;",

	"`i\"", "&#8146;",
	"'i\"", "&#8147;",
	"\\~i\"", "&#8151;",
	"i\"", "&#970;",

	"`i", "&#8054;",
	"'i", "&#8055;",
	"\\~i", "&#8150;",
	"i", "&#953;",

	"`>o", "&#8002;",
	"`<o", "&#8003;",
	"'>o", "&#8004;",
	"'<o", "&#8005;",
	">o", "&#8000;",
	"<o", "&#8001;",

	"`o", "&#8056;",
	"'o", "&#8057;",
	"o", "&#959;",

	"`>u", "&#8018;",
	"`<u", "&#8019;",
	"'>u", "&#8020;",
	"'<u", "&#8021;",
	"\\~>u", "&#8022;",
	"\\~<u", "&#8023;",
	">u", "&#8016;",
	"<u", "&#8017;",

	"`u\"", "&#8162;",
	"'u\"", "&#8163;",
	"\\~u\"", "&#8167;",
	"u\"", "&#971;",

	"`u", "&#8058;",
	"'u", "&#8059;",
	"\\~u", "&#8166;",
	"u", "&#965;",

	"`>w|", "&#8098;",
	"`<w|", "&#8099;",
	"'>w|", "&#8100;",
	"'<w|", "&#8101;",
	"\\~>w|", "&#8102;",
	"\\~<w|", "&#8103;",
	">w|", "&#8096;",
	"<w|", "&#8097;",

	"`w|", "&#8178;",
	"'w|", "&#8179;",
	"\\~w|", "&#8183;",
	"w|", "&#8179;",

	"`>w", "&#8034;",
	"`<w", "&#8035;",
	"'>w", "&#8036;",
	"'<w", "&#8037;",
	"\\~>w", "&#8038;",
	"\\~<w", "&#8039;",
	">w", "&#8032;",
	"<w", "&#8033;",

	"`w", "&#8060;",
	"'w", "&#8061;",
	"\\~w", "&#8182;",
	"w", "&#969;",

	"`>A|", "&#8074;",
	"`<A|", "&#8075;",
	"'>A|", "&#8076;",
	"'<A|", "&#8077;",
	"\\~>A|", "&#8078;",
	"\\~<A|", "&#8079;",
	">A|", "&#8072;",
	"<A|", "&#8073;",

	"A|", "&#8124;",

	"A\"", "&#8121;", // bad replacement

	"`>A", "&#7946;",
	"`<A", "&#7947;",
	"'>A", "&#7948;",
	"'<A", "&#7949;",
	"\\~>A", "&#7950;",
	"\\~<A", "&#7951;",
	">A", "&#7944;",
	"<A", "&#7945;",

	"`A", "&#8022;",
	"'A", "&#8023;",
	"A", "&#913;",

	"`>E", "&#7962;",
	"`<E", "&#7963;",
	"'>E", "&#7964;",
	"'<E", "&#7965;",
	">E", "&#7960;",
	"<E", "&#7961;",

	"`E", "&#8136;",
	"'E", "&#8137;",
	"E", "&#917;",

	"`>H|", "&#8090;",
	"`<H|", "&#8091;",
	"'>H|", "&#8092;",
	"'<H|", "&#8093;",
	"\\~>H|", "&#8094;",
	"\\~<H|", "&#8095;",
	">H|", "&#8088;",
	"<H|", "&#8089;",

	"H|", "&#8140;",

	"`>H", "&#7978;",
	"`<H", "&#7979;",
	"'>H", "&#7980;",
	"'<H", "&#7981;",
	"\\~>H", "&#7982;",
	"\\~<H", "&#7983;",
	">H", "&#7976;",
	"<H", "&#7977;",

	"`H", "&#8038;",
	"'H", "&#8039;",
	"H", "&#919;",

	"`>I", "&#7994;",
	"`<I", "&#7995;",
	"'>I", "&#7996;",
	"'<I", "&#7997;",
	"\\~>I", "&#7998;",
	"\\~<I", "&#7999;",
	">I", "&#7992;",
	"<I", "&#7993;",

	"`I", "&#8154;",
	"'I", "&#8155;",
	"I", "&#921;",

	"`>O", "&#8008;",
	"`<O", "&#8009;",
	"'>O", "&#8012;",
	"'<O", "&#8013;",
	">O", "&#8008;",
	"<O", "&#8009;",

	"`O", "&#8084;",
	"'O", "&#8085;",
	"O", "&#927;",

	"`>U", "&#8026;",
	"`<U", "&#8027;",
	"'>U", "&#8028;",
	"'<U", "&#8029;",
	"\\~>U", "&#8030;",
	"\\~<U", "&#8031;",
	">U", "&#8024;",
	"<U", "&#8025;",

	"`U", "&#8170;",
	"'U", "&#8171;",
	"U", "&#933;",

	"`>W|", "&#8106;",
	"`<W|", "&#8107;",
	"'>W|", "&#8108;",
	"'<W|", "&#8109;",
	"\\~>W|", "&#8110;",
	"\\~<W|", "&#8111;",
	">W|", "&#8104;",
	"<W|", "&#8105;",

	"`>W", "&#8042;",
	"`<W", "&#8043;",
	"'>W", "&#8044;",
	"'<W", "&#8045;",
	"\\~>W", "&#8046;",
	"\\~<W", "&#8047;",
	">W", "&#8040;",
	"<W", "&#8041;",

	"`W", "&#8186;",
	"'W", "&#8187;",
	"W", "&#937;",

	">r", "&#8164;",
	"<r", "&#8165;",
	"r", "&#961;",	

	"<R", "&#8172;",
	"R", "&#929;",
	
	"s ", "&#962;",
	"s", "&#963;",

	"S", "&#931;",

	"b", "&#946;",
	"g", "&#947;",
	"d", "&#948;",
	"z", "&#950;",
	"j", "&#952;",
	"k", "&#954;",
	"l", "&#955;",
	"m", "&#956;",
	"n", "&#957;",
	"x", "&#958;",
	"p", "&#960;",
	"t", "&#964;",
	"f", "&#966;",
	"q", "&#967;",
	"y", "&#968;",

	"B", "&#914;",
	"G", "&#915;",
	"D", "&#916;",
	"Z", "&#918;",
	"J", "&#920;",
	"K", "&#922;",
	"L", "&#923;",
	"M", "&#924;",
	"N", "&#925;",
	"X", "&#926;",
	"P", "&#928;",
	"T", "&#932;",
	"F", "&#934;",
	"Q", "&#935;",
	"Y", "&#936;",

	"%", "&#182;",
	"?", "&#59;",
	":", "&#183;",
	"-", "&#8208;",
	".", "&#8228;",
	",", "&#8218;",
	"'", "&#39;" // must go last
];

var open_greek_basic_html_replacement = [

	"`>a|", "&#945;",
	"`<a|", "&#945;",
	"'>a|", "&#945;",
	"'<a|", "&#945;",
	"\\~>a|", "&#945;",
	"\\~<a|", "&#945;",
	">a|", "&#945;",
	"<a|", "&#945;",

	"`a|", "&#945;",
	"'a|", "&#945;",
	"\\~a|", "&#945;",
	"a|", "&#945;",

	"a\"", "&#945;", // bad replacement

	"`>a", "&#945;",
	"`<a", "&#945;",
	"'>a", "&#945;",
	"'<a", "&#945;",
	"\\~>a", "&#945;",
	"\\~<a", "&#945;",
	">a", "&#945;",
	"<a", "&#945;",

	"`a", "&#945;",
	"'a", "&#945;",
	"\\~a", "&#945;",
	"a", "&#945;",

	"`>e", "&#949;",
	"`<e", "&#949;",
	"'>e", "&#949;",
	"'<e", "&#949;",
	">e", "&#949;",
	"<e", "&#949;",

	"`e", "&#949;",
	"'e", "&#949;",
	"e", "&#949;",

	"`>h|", "&#951;",
	"`<h|", "&#951;",
	"'>h|", "&#951;",
	"'<h|", "&#951;",
	"\\~>h|", "&#951;",
	"\\~<h|", "&#951;",
	">h|", "&#951;",
	"<h|", "&#951;",

	"`h|", "&#951;",
	"'h|", "&#951;",
	"\\~h|", "&#951;",
	"h|", "&#951;",

	"`>h", "&#951;",
	"`<h", "&#951;",
	"'>h", "&#951;",
	"'<h", "&#951;",
	"\\~>h", "&#951;",
	"\\~<h", "&#951;",
	">h", "&#951;",
	"<h", "&#951;",

	"`h", "&#951;",
	"'h", "&#951;",
	"\\~h", "&#951;",
	"h", "&#951;",

	"`>i", "&#953;",
	"`<i", "&#953;",
	"'>i", "&#953;",
	"'<i", "&#953;",
	"\\~>i", "&#953;",
	"\\~<i", "&#953;",
	">i", "&#953;",
	"<i", "&#953;",

	"`i\"", "&#953;",
	"'i\"", "&#953;",
	"\\~i\"", "&#953;",
	"i\"", "&#953;",

	"`i", "&#953;",
	"'i", "&#953;",
	"\\~i", "&#953;",
	"i", "&#953;",

	"`>o", "&#959;",
	"`<o", "&#959;",
	"'>o", "&#959;",
	"'<o", "&#959;",
	">o", "&#959;",
	"<o", "&#959;",

	"`o", "&#959;",
	"'o", "&#959;",
	"o", "&#959;",

	"`>u", "&#965;",
	"`<u", "&#965;",
	"'>u", "&#965;",
	"'<u", "&#965;",
	"\\~>u", "&#965;",
	"\\~<u", "&#965;",
	">u", "&#965;",
	"<u", "&#965;",

	"`u\"", "&#965;",
	"'u\"", "&#965;",
	"\\~u\"", "&#965;",
	"u\"", "&#965;",

	"`u", "&#965;",
	"'u", "&#965;",
	"\\~u", "&#965;",
	"u", "&#965;",

	"`>w|", "&#969;",
	"`<w|", "&#969;",
	"'>w|", "&#969;",
	"'<w|", "&#969;",
	"\\~>w|", "&#969;",
	"\\~<w|", "&#969;",
	">w|", "&#969;",
	"<w|", "&#969;",

	"`w|", "&#969;",
	"'w|", "&#969;",
	"\\~w|", "&#969;",
	"w|", "&#969;",

	"`>w", "&#969;",
	"`<w", "&#969;",
	"'>w", "&#969;",
	"'<w", "&#969;",
	"\\~>w", "&#969;",
	"\\~<w", "&#969;",
	">w", "&#969;",
	"<w", "&#969;",

	"`w", "&#969;",
	"'w", "&#969;",
	"\\~w", "&#969;",
	"w", "&#969;",

	"`>A|", "&#913;",
	"`<A|", "&#913;",
	"'>A|", "&#913;",
	"'<A|", "&#913;",
	"\\~>A|", "&#913;",
	"\\~<A|", "&#913;",
	">A|", "&#913;",
	"<A|", "&#913;",

	"A|", "&#913;",

	"A\"", "&#913;", // bad replacement

	"`>A", "&#913;",
	"`<A", "&#913;",
	"'>A", "&#913;",
	"'<A", "&#913;",
	"\\~>A", "&#913;",
	"\\~<A", "&#913;",
	">A", "&#913;",
	"<A", "&#913;",

	"`A", "&#913;",
	"'A", "&#913;",
	"A", "&#913;",

	"`>E", "&#917;",
	"`<E", "&#917;",
	"'>E", "&#917;",
	"'<E", "&#917;",
	">E", "&#917;",
	"<E", "&#917;",

	"`E", "&#917;",
	"'E", "&#917;",
	"E", "&#917;",

	"`>H|", "&#919;",
	"`<H|", "&#919;",
	"'>H|", "&#919;",
	"'<H|", "&#919;",
	"\\~>H|", "&#919;",
	"\\~<H|", "&#919;",
	">H|", "&#919;",
	"<H|", "&#919;",

	"H|", "&#919;",

	"`>H", "&#919;",
	"`<H", "&#919;",
	"'>H", "&#919;",
	"'<H", "&#919;",
	"\\~>H", "&#919;",
	"\\~<H", "&#919;",
	">H", "&#919;",
	"<H", "&#919;",

	"`H", "&#919;",
	"'H", "&#919;",
	"H", "&#919;",

	"`>I", "&#921;",
	"`<I", "&#921;",
	"'>I", "&#921;",
	"'<I", "&#921;",
	"\\~>I", "&#921;",
	"\\~<I", "&#921;",
	">I", "&#921;",
	"<I", "&#921;",

	"`I", "&#921;",
	"'I", "&#921;",
	"I", "&#921;",

	"`>O", "&#927;",
	"`<O", "&#927;",
	"'>O", "&#927;",
	"'<O", "&#927;",
	">O", "&#927;",
	"<O", "&#927;",

	"`O", "&#927;",
	"'O", "&#927;",
	"O", "&#927;",

	"`>U", "&#933;",
	"`<U", "&#933;",
	"'>U", "&#933;",
	"'<U", "&#933;",
	"\\~>U", "&#933;",
	"\\~<U", "&#933;",
	">U", "&#933;",
	"<U", "&#933;",

	"`U", "&#933;",
	"'U", "&#933;",
	"U", "&#933;",

	"`>W|", "&#937;",
	"`<W|", "&#937;",
	"'>W|", "&#937;",
	"'<W|", "&#937;",
	"\\~>W|", "&#937;",
	"\\~<W|", "&#937;",
	">W|", "&#937;",
	"<W|", "&#937;",

	"`>W", "&#937;",
	"`<W", "&#937;",
	"'>W", "&#937;",
	"'<W", "&#937;",
	"\\~>W", "&#937;",
	"\\~<W", "&#937;",
	">W", "&#937;",
	"<W", "&#937;",

	"`W", "&#937;",
	"'W", "&#937;",
	"W", "&#937;",

	">r", "&#961;",
	"<r", "&#961;",
	"r", "&#961;",	

	"<R", "&#929;",
	"R", "&#929;",
	
	"s ", "&#962;",
	"s", "&#963;",

	"S", "&#931;",

	"b", "&#946;",
	"g", "&#947;",
	"d", "&#948;",
	"z", "&#950;",
	"j", "&#952;",
	"k", "&#954;",
	"l", "&#955;",
	"m", "&#956;",
	"n", "&#957;",
	"x", "&#958;",
	"p", "&#960;",
	"t", "&#964;",
	"f", "&#966;",
	"q", "&#967;",
	"y", "&#968;",

	"B", "&#914;",
	"G", "&#915;",
	"D", "&#916;",
	"Z", "&#918;",
	"J", "&#920;",
	"K", "&#922;",
	"L", "&#923;",
	"M", "&#924;",
	"N", "&#925;",
	"X", "&#926;",
	"P", "&#928;",
	"T", "&#932;",
	"F", "&#934;",
	"Q", "&#935;",
	"Y", "&#936;",

	"%", "&#182;",
	"?", "&#59;",
	":", "&#183;",
	"-", "&#45;",
	".", "&#46;",
	",", "&#44;",
	"'", "&#39;" // must go last
];

var open_hebrew_html_replacement = [

	// these must come first
	"c", "&#1495;", // .h -> c -> ch
	"t", "&#1496;", // .t -> t -> t
	"j", "&#1510;", // .s -> j -> tz
	"J", "&#1509;", // .S -> J -> TZ
	"x", "&#1513;", // /s -> x -> sh

	"'", "&#1488;", // -> '
	"`", "&#1506;", // -> `

	"b", "&#1489;", // -> b
	"g", "&#1490;", // -> g
	"d", "&#1491;", // -> d
	"h", "&#1492;", // -> h
	"w", "&#1493;", // -> w
	"z", "&#1494;", // -> z
	"y", "&#1497;", // -> y
	"k", "&#1499;", // -> k
	"K", "&#1498;", // -> K
	"l", "&#1500;", // -> l
	"m", "&#1502;", // -> m
	"M", "&#1501;", // -> M
	"n", "&#1504;", // -> n
	"N", "&#1503;", // -> N
	"s", "&#1505;", // -> s
	"p", "&#1508;", // -> p
	"P", "&#1507;", // -> P
	"q", "&#1511;", // -> q
	"r", "&#1512;", // -> r
	"T", "&#1514;", // t -> T -> t
	
	":", "&#1475;",
	"-", "&#1470;" // -- -> - -> -
];

var open_html_colors = [

	"black",
	"grey",
	"white",
	"red",
	"green",
	"blue",
	"magenta",
	"yellow",
	"cyan",
	"aliceblue",
	"antiquewhite",
	"aqua",
	"aquamarine",
	"azure",
	"beige",
	"bisque",
	"blanchedalmond",
	"blueviolet",
	"brown",
	"burlywood",
	"cadetblue",
	"chartreuse",
	"chocolate",
	"coral",
	"cornflowerblue",
	"cornsilk",
	"crimson",
	"darkblue",
	"darkcyan",
	"darkgoldenrod",
	"darkgreen",
	"darkkhaki",
	"darkmagenta",
	"darkolivegreen",
	"darkorange",
	"darkorchid",
	"darkred",
	"darksalmon",
	"darkseagreen",
	"darkslateblue",
	"darkslategrey",
	"darkturquoise",
	"darkviolet",
	"deeppink",
	"deepskyblue",
	"dimgrey",
	"dodgerblue",
	"firebrick",
	"floralwhite",
	"fuchsia",
	"gainsboro",
	"ghostwhite",
	"forestgreen",
	"gold",
	"goldenrod",
	"greenyellow",
	"honeydew",
	"indianred",
	"hotpink",
	"indigo",
	"ivory",
	"khaki",
	"lavender",
	"lavenderblush",
	"lawngreen",
	"lemonchiffon",
	"lightblue",
	"lightcoral",
	"lightcyan",
	"lightgoldenrodyellow",
	"lightgreen",
	"lightpink",
	"lightsalmon",
	"lightseagreen",
	"lightskyblue",
	"lightslategrey",
	"lightsteelblue",
	"lightyellow",
	"lime",
	"limegreen",
	"linen",
	"maroon",
	"mediumaquamarine",
	"mediumblue",
	"mediumorchid",
	"mediumpurple",
	"mediumseagreen",
	"mediumslateblue",
	"mediumspringgreen",
	"mediumturquoise",
	"mediumvioletred",
	"midnightblue",
	"mintcream",
	"mistyrose",
	"moccasin",
	"navajowhite",
	"navy",
	"oldlace",
	"olive",
	"olivedrab",
	"orange",
	"orangered",
	"orchid",
	"palegoldenrod",
	"palegreen",
	"paleturqoise",
	"palevioletred",
	"papayawhip",
	"peachpuff",
	"peru",
	"pink",
	"plum",
	"powderblue",
	"purple",
	"rebeccapurple",
	"rosybrown",
	"royalblue",
	"saddlebrown",
	"salmon",
	"sandybrown",
	"seagreen",
	"seashell",
	"sienna",
	"silver",
	"skyblue",
	"slateblue",
	"slategrey",
	"snow",
	"springgreen",
	"steelblue",
	"tan",
	"teal",
	"thistle",
	"tomato",
	"turquoise",
	"violet",
	"wheat",
	"whitesmoke",
	"yellowgreen"
];

Initialize();

document.getElementById("return_button").addEventListener("click", function()
{	
	clearInterval(open_external_loop_interval);
	clearInterval(open_external_inner_interval);
	clearInterval(open_search_text_interval);

	if (document.getElementById("options_popup_width_input"))
	{
		open_options_popup_width = document.getElementById("options_popup_width_input").value;

		if (open_options_popup_width < 50) open_options_popup_width = 50;
		else if (open_options_popup_width > window.innerWidth - 40) open_options_popup_width = window.innerWidth - 40;

		localStorage.setItem("myPopup", open_options_popup_width);
	}

	if (document.getElementById("options_english_font_input"))
	{
		open_options_english_font = document.getElementById("options_english_font_input").value;

		if (open_options_english_font < 4) open_options_english_font = 4;
		else if (open_options_english_font > 40) open_options_english_font = 40;

		localStorage.setItem("myFontEnglish", open_options_english_font);
	}

	if (document.getElementById("options_hebrew_font_input"))
	{
		open_options_hebrew_font = document.getElementById("options_hebrew_font_input").value;

		if (open_options_hebrew_font < 4) open_options_hebrew_font = 4;
		else if (open_options_hebrew_font > 40) open_options_hebrew_font = 40;

		localStorage.setItem("myFontHebrew", open_options_hebrew_font);
	}

	if (document.getElementById("options_greek_font_input"))
	{
		open_options_greek_font = document.getElementById("options_greek_font_input").value;

		if (open_options_greek_font < 4) open_options_greek_font = 4;
		else if (open_options_greek_font > 40) open_options_greek_font = 40;

		localStorage.setItem("myFontGreek", open_options_greek_font);
	}

	if (document.getElementById("options_latin_font_input"))
	{
		open_options_latin_font = document.getElementById("options_latin_font_input").value;

		if (open_options_latin_font < 4) open_options_latin_font = 4;
		else if (open_options_latin_font > 40) open_options_latin_font = 40;

		localStorage.setItem("myFontLatin", open_options_latin_font);
	}

	if (document.getElementById("options_gloss_font_input"))
	{
		open_options_gloss_font = document.getElementById("options_gloss_font_input").value;

		if (open_options_gloss_font < 2) open_options_gloss_font = 2;
		else if (open_options_gloss_font > 40) open_options_gloss_font = 40;

		localStorage.setItem("myFontGloss", open_options_gloss_font);
	}

	if (document.getElementById("options_popup_font_input"))
	{
		open_options_popup_font = document.getElementById("options_popup_font_input").value;

		if (open_options_popup_font < 2) open_options_popup_font = 2;
		else if (open_options_popup_font > 40) open_options_popup_font = 40;

		localStorage.setItem("myFontPopup", open_options_popup_font);
	}

//	if (document.getElementById("options_menu_font_input"))
//	{
//		open_options_menu_font = document.getElementById("options_menu_font_input").value;
//
//		if (open_options_menu_font < 8) open_options_menu_font = 8;
//		else if (open_options_menu_font > 40) open_options_menu_font = 40;
//
//		localStorage.setItem("myFontMenu", open_options_menu_font);
//	}

	if (document.getElementById("options_background_color_input"))
	{
		open_options_background_color = document.getElementById("options_background_color_input").value;

		localStorage.setItem("myColorBackground", open_options_background_color);
	}

	if (document.getElementById("options_text_color_input"))
	{
		open_options_text_color = document.getElementById("options_text_color_input").value;

		if (open_options_text_color == open_options_background_color)
		{
			if (open_options_background_color == "black") // kindof cheap
			{
				open_options_text_color = "white";
			}
			else
			{
				open_options_text_color = "black";
			}
		}

		localStorage.setItem("myColorText", open_options_text_color);
	}

	if (document.getElementById("options_jesus_color_input"))
	{
		open_options_jesus_color = document.getElementById("options_jesus_color_input").value;

		if (open_options_jesus_color == open_options_background_color)
		{
			if (open_options_background_color == "black") // kindof cheap
			{
				open_options_jesus_color = "white";
			}
			else
			{
				open_options_jesus_color = "black";
			}
		}

		localStorage.setItem("myColorJesus", open_options_jesus_color);
	}
	
	if (document.getElementById("options_greek_polytonic_input"))
	{
		open_options_greek_polytonic = document.getElementById("options_greek_polytonic_input").value;

		localStorage.setItem("myPolytonicGreek", open_options_greek_polytonic);
	}

	document.getElementById("loading_div").style.display = "block";

	document.getElementById("menu_div").style.display = "none";

	document.getElementById("main_div").innerHTML = "";

	Initialize();
});

document.getElementById("menu_button").addEventListener("click", function()
{
	clearInterval(open_external_loop_interval);
	clearInterval(open_external_inner_interval);
	clearInterval(open_search_text_interval);

	document.getElementById("menu_div").style.display = "block";

	document.getElementById("top_div").style.display = "none";
	document.getElementById("bottom_div").style.display = "none";
	document.getElementById("popup_div").style.display = "none";

	document.getElementById("main_div").innerHTML = "";

	document.getElementById("main_div").style.color = open_options_text_color;
	document.getElementById("top_div").style.color = open_options_text_color;
	document.getElementById("bottom_div").style.color = open_options_text_color;
	document.getElementById("popup_div").style.color = open_options_text_color;
	document.getElementById("menu_div").style.color = open_options_text_color;

	document.getElementById("main_div").style.backgroundColor = open_options_background_color;
	document.getElementById("top_div").style.backgroundColor = open_options_background_color;
	document.getElementById("bottom_div").style.backgroundColor = open_options_background_color;
	document.getElementById("popup_div").style.backgroundColor = open_options_background_color;
	document.getElementById("menu_div").style.backgroundColor = open_options_background_color;
	
	document.getElementById("loading_div").style.color = open_options_text_color;
	document.getElementById("loading_div").style.backgroundColor = open_options_background_color;

	document.body.style.backgroundColor = open_options_background_color;

	var elem, parent, table_elem, tr_elem, td_elem;

	// start of English Bible

	elem = document.createElement("p");
	elem.id = "english_para";
	elem.innerHTML = "<b><i>KJV English</i></b> &#9660;";
	document.getElementById("main_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	elem = document.createElement("div");
	elem.id = "english_holder_div";
	elem.style.backgroundColor = open_options_background_color;
	elem.style.display = "none";
	document.getElementById("main_div").appendChild(elem);

	for (var elem_loop=0; elem_loop<open_ot_name_listing.length; elem_loop++) // increase the size
	{
		elem = document.createElement("label");
		elem.setAttribute("class", "english_book_title");
		elem.setAttribute("data-book", elem_loop);
		elem.setAttribute("data-book-name", open_ot_name_listing[elem_loop]);
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_menu_font + "px";
		elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;" + open_ot_name_listing[elem_loop] + "</b>";
		document.getElementById("english_holder_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("english_holder_div").appendChild(elem);

		parent = document.createElement("div");
		parent.id = "english_" + open_ot_name_listing[elem_loop] + "_holder_div";
		parent.style.backgroundColor = open_options_background_color;
		parent.style.display = "none";
		document.getElementById("english_holder_div").appendChild(parent);

		for (var range_loop=1; range_loop<=open_ot_range_listing[elem_loop]; range_loop++)
		{
			elem = document.createElement("span");
			elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			parent.appendChild(elem);

			elem = document.createElement("a");
			elem.setAttribute("class", "english_chapter_button");
			elem.setAttribute("data-mode", "english_ot");
			elem.setAttribute("data-book", elem_loop);
			elem.setAttribute("data-book-name", open_ot_name_listing[elem_loop]);
			elem.setAttribute("data-chapter", range_loop);
			elem.href = "#";
			elem.style.color = open_options_text_color;
			elem.style.fontSize = open_options_menu_font + "px";
			elem.innerHTML = open_ot_name_listing[elem_loop] + (open_ot_range_listing[elem_loop] > 1 ? " " + range_loop : "");
			parent.appendChild(elem);

			elem = document.createElement("br");
			parent.appendChild(elem);
		}
	}

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;----</b>";
	document.getElementById("english_holder_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("english_holder_div").appendChild(elem);

	for (var elem_loop=0; elem_loop<open_nt_name_listing.length; elem_loop++)
	{
		elem = document.createElement("label");
		elem.setAttribute("class", "english_book_title");
		elem.setAttribute("data-book", elem_loop);
		elem.setAttribute("data-book-name", open_nt_name_listing[elem_loop]);
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_menu_font + "px";
		elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;" + open_nt_name_listing[elem_loop] + "</b>";
		document.getElementById("english_holder_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("english_holder_div").appendChild(elem);

		parent = document.createElement("div");
		parent.id = "english_" + open_nt_name_listing[elem_loop] + "_holder_div";
		parent.style.backgroundColor = open_options_background_color;
		parent.style.display = "none";
		document.getElementById("english_holder_div").appendChild(parent);

		for (var range_loop=1; range_loop<=open_nt_range_listing[elem_loop]; range_loop++)
		{
			elem = document.createElement("span");
			elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			parent.appendChild(elem);

			elem = document.createElement("a");
			elem.setAttribute("class", "english_chapter_button");
			elem.setAttribute("data-mode", "english_nt");
			elem.setAttribute("data-book", elem_loop);
			elem.setAttribute("data-book-name", open_nt_name_listing[elem_loop]);
			elem.setAttribute("data-chapter", range_loop);
			elem.href = "#";
			elem.style.color = open_options_text_color;
			elem.style.fontSize = open_options_menu_font + "px";
			elem.innerHTML = open_nt_name_listing[elem_loop] + (open_nt_range_listing[elem_loop] > 1 ? " " + range_loop : "");
			parent.appendChild(elem);

			elem = document.createElement("br");
			parent.appendChild(elem);
		}
	}

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;----</b>";
	document.getElementById("english_holder_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("english_holder_div").appendChild(elem);
	
	elem = document.createElement("label");
	elem.id = "english_tools_label";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;Tools</b>";
	document.getElementById("english_holder_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("english_holder_div").appendChild(elem);

	parent = document.createElement("div");
	parent.id = "english_tools_holder_div";
	parent.style.backgroundColor = open_options_background_color;
	parent.style.display = "none";
	document.getElementById("english_holder_div").appendChild(parent);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	parent.appendChild(elem);
	
	elem = document.createElement("a");
	elem.id = "english_tools_search_anchor";
	elem.setAttribute("data-mode", "english_tools");
	elem.setAttribute("data-book", 0);
	elem.setAttribute("data-book-name", "English Search");
	elem.setAttribute("data-chapter", 1);
	elem.href = "#";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "English Search";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	parent.appendChild(elem);

	elem = document.createElement("a");
	elem.id = "english_tools_random_anchor";
	elem.setAttribute("data-mode", "english_tools");
	elem.setAttribute("data-book", 1);
	elem.setAttribute("data-book-name", "English Random Chapter");
	elem.setAttribute("data-chapter", 1);
	elem.href = "#";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "English Random Chapter";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	// start of Hebrew Bible

	elem = document.createElement("p");
	elem.id = "hebrew_para";
	elem.innerHTML = "<b><i>Mas. Hebrew</i></b> &#9660;";
	document.getElementById("main_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	elem = document.createElement("div");
	elem.id = "hebrew_holder_div";
	elem.style.backgroundColor = open_options_background_color;
	elem.style.display = "none";
	document.getElementById("main_div").appendChild(elem);

	for (var elem_loop=0; elem_loop<open_ot_name_listing.length; elem_loop++) // increase the size
	{
		elem = document.createElement("label");
		elem.setAttribute("class", "hebrew_book_title");
		elem.setAttribute("data-book", elem_loop);
		elem.setAttribute("data-book-name", open_ot_name_listing[elem_loop]);
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_menu_font + "px";
		elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;" + open_ot_name_listing[elem_loop] + "</b>";
		document.getElementById("hebrew_holder_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("hebrew_holder_div").appendChild(elem);

		parent = document.createElement("div");
		parent.id = "hebrew_" + open_ot_name_listing[elem_loop] + "_holder_div";
		parent.style.backgroundColor = open_options_background_color;
		parent.style.display = "none";
		document.getElementById("hebrew_holder_div").appendChild(parent);

		for (var range_loop=1; range_loop<=open_ot_range_listing[elem_loop]; range_loop++)
		{
			elem = document.createElement("span");
			elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			parent.appendChild(elem);

			elem = document.createElement("a");
			elem.setAttribute("class", "hebrew_chapter_button");
			elem.setAttribute("data-mode", "hebrew");
			elem.setAttribute("data-book", elem_loop);
			elem.setAttribute("data-book-name", open_ot_name_listing[elem_loop]);
			elem.setAttribute("data-chapter", range_loop);
			elem.href = "#";
			elem.style.color = open_options_text_color;
			elem.style.fontSize = open_options_menu_font + "px";
			elem.innerHTML = open_ot_name_listing[elem_loop] + (open_ot_range_listing[elem_loop] > 1 ? " " + range_loop : "");
			parent.appendChild(elem);

			elem = document.createElement("br");
			parent.appendChild(elem);
		}
	}

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;----</b>";
	document.getElementById("hebrew_holder_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("hebrew_holder_div").appendChild(elem);
	
	elem = document.createElement("label");
	elem.id = "hebrew_tools_label";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;Tools</b>";
	document.getElementById("hebrew_holder_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("hebrew_holder_div").appendChild(elem);

	parent = document.createElement("div");
	parent.id = "hebrew_tools_holder_div";
	parent.style.backgroundColor = open_options_background_color;
	parent.style.display = "none";
	document.getElementById("hebrew_holder_div").appendChild(parent);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	parent.appendChild(elem);
	
	elem = document.createElement("a");
	elem.id = "hebrew_tools_search_anchor";
	elem.setAttribute("data-mode", "hebrew_tools");
	elem.setAttribute("data-book", 0);
	elem.setAttribute("data-book-name", "Hebrew Search");
	elem.setAttribute("data-chapter", 1);
	elem.href = "#";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "Hebrew Search";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	// start of Greek New Testament

	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	elem = document.createElement("p");
	elem.id = "greek_para";
	elem.innerHTML = "<b><i>Byz. Greek</i></b> &#9660;";
	document.getElementById("main_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	elem = document.createElement("div");
	elem.id = "greek_holder_div";
	elem.style.backgroundColor = open_options_background_color;
	elem.style.display = "none";
	document.getElementById("main_div").appendChild(elem);

	for (var elem_loop=0; elem_loop<open_nt_name_listing.length; elem_loop++)
	{
		elem = document.createElement("label");
		elem.setAttribute("class", "greek_book_title");
		elem.setAttribute("data-book", elem_loop);
		elem.setAttribute("data-book-name", open_nt_name_listing[elem_loop]);
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_menu_font + "px";
		elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;" + open_nt_name_listing[elem_loop] + "</b>";
		document.getElementById("greek_holder_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("greek_holder_div").appendChild(elem);

		parent = document.createElement("div");
		parent.id = "greek_" + open_nt_name_listing[elem_loop] + "_holder_div";
		parent.style.backgroundColor = open_options_background_color;
		parent.style.display = "none";
		document.getElementById("greek_holder_div").appendChild(parent);

		for (var range_loop=1; range_loop<=open_nt_range_listing[elem_loop]; range_loop++)
		{
			elem = document.createElement("span");
			elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			parent.appendChild(elem);

			elem = document.createElement("a");
			elem.setAttribute("class", "greek_chapter_button");
			elem.setAttribute("data-mode", "greek");
			elem.setAttribute("data-book", elem_loop);
			elem.setAttribute("data-book-name", open_nt_name_listing[elem_loop]);
			elem.setAttribute("data-chapter", range_loop);
			elem.href = "#";
			elem.style.color = open_options_text_color;
			elem.style.fontSize = open_options_menu_font + "px";
			elem.innerHTML = open_nt_name_listing[elem_loop] + (open_nt_range_listing[elem_loop] > 1 ? " " + range_loop : "");
			parent.appendChild(elem);

			elem = document.createElement("br");
			parent.appendChild(elem);
		}
	}

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;----</b>";
	document.getElementById("greek_holder_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("greek_holder_div").appendChild(elem);
	
	elem = document.createElement("label");
	elem.id = "greek_tools_label";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;Tools</b>";
	document.getElementById("greek_holder_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("greek_holder_div").appendChild(elem);

	parent = document.createElement("div");
	parent.id = "greek_tools_holder_div";
	parent.style.backgroundColor = open_options_background_color;
	parent.style.display = "none";
	document.getElementById("greek_holder_div").appendChild(parent);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	parent.appendChild(elem);
	
	elem = document.createElement("a");
	elem.id = "greek_tools_search_anchor";
	elem.setAttribute("data-mode", "greek_tools");
	elem.setAttribute("data-book", 0);
	elem.setAttribute("data-book-name", "Greek Search");
	elem.setAttribute("data-chapter", 1);
	elem.href = "#";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "Greek Search";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	parent.appendChild(elem);
	
	elem = document.createElement("a");
	elem.id = "greek_tools_grammar_anchor";
	elem.setAttribute("data-mode", "greek_tools");
	elem.setAttribute("data-book", 1);
	elem.setAttribute("data-book-name", "Greek Grammar");
	elem.setAttribute("data-chapter", 1);
	elem.href = "#";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "Greek Grammar";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	for (var lex_loop=1; lex_loop<=25; lex_loop++)
	{
		if (lex_loop == 18) lex_loop++;

		elem = document.createElement("span");
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_menu_font + "px";
		elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		parent.appendChild(elem);
	
		elem = document.createElement("a");
		elem.setAttribute("class", "lexicon_button");
		elem.setAttribute("data-mode", "greek_tools");
		elem.setAttribute("data-book", 2);
		elem.setAttribute("data-book-name", "Greek Lexicon");
		elem.setAttribute("data-chapter", lex_loop);
		elem.href = "#";
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_menu_font + "px";
		elem.innerHTML = "Greek Lexicon - &#" + parseInt(912 + lex_loop) + ";";
		parent.appendChild(elem);
	
		elem = document.createElement("br");
		parent.appendChild(elem);
	}

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	parent.appendChild(elem);
	
	elem = document.createElement("a");
	elem.setAttribute("class", "lexicon_button");
	elem.setAttribute("data-mode", "greek_tools");
	elem.setAttribute("data-book", 2);
	elem.setAttribute("data-book-name", "Greek Lexicon");
	elem.setAttribute("data-chapter", 26);
	elem.href = "#";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "Greek Lexicon - Rare";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reset Glosses to Word Count";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reset to: ";
	parent.appendChild(elem);
	
	elem = document.createElement("input");
	elem.type = "number";
	elem.style.width = "80px";
	elem.style.height = "30px";
	elem.value = "30";
	elem.id = "options_reset_greek_glosses_input";
	parent.appendChild(elem);

	elem = document.createElement("button");
	elem.innerHTML = "Reset";
	elem.addEventListener("click", function(event)
	{
		if (event.pageX > window.innerWidth - open_options_popup_width - 20)
		{
			document.getElementById("popup_div").style.left = (window.innerWidth - open_options_popup_width - 20) + "px";
		}
		else
		{
			document.getElementById("popup_div").style.left = event.pageX + "px";
		}
			
		document.getElementById("popup_div").style.top = event.pageY + "px";
		document.getElementById("popup_div").style.width = open_options_popup_width + "px";

		document.getElementById("popup_div").style.fontSize = open_options_popup_font + "px";
		document.getElementById("popup_div").style.color = open_options_text_color;

		document.getElementById("popup_div").style.display = "inline";

		document.getElementById("popup_div").innerHTML = "All glosses with a word count higher than this number " +
			"will be unchecked, and the rest will be checked.<br>" +
			"Also all custom gloss translations will be erased.<br>" +
			"Are you sure you want to reset the glosses?<br>";

		var temp_elem = document.createElement("button");
		temp_elem.style.float = "left";
		temp_elem.innerHTML = "Yes";
		temp_elem.addEventListener("click", function()
		{
			document.getElementById("popup_div").style.display = "none";

			for (var quick_loop=1; quick_loop<=5625; quick_loop++)
			{
				if (open_greek_count_array[quick_loop] > parseInt(document.getElementById("options_reset_greek_glosses_input").value))
				{
					open_gloss_view_array[quick_loop] = "hide";

					localStorage.setItem("myGlossView" + quick_loop, open_gloss_view_array[quick_loop]);

					localStorage.setItem("myGlossTrans" + quick_loop, "");
				}
				else
				{
					open_gloss_view_array[quick_loop] = "show";

					localStorage.setItem("myGlossView" + quick_loop, open_gloss_view_array[quick_loop]);

					localStorage.setItem("myGlossTrans" + quick_loop, "");
				}
			}

			document.getElementById("popup_div").style.display = "none";

			document.getElementById("return_button").click();
		});
		document.getElementById("popup_div").appendChild(temp_elem);

		temp_elem = document.createElement("button");
		temp_elem.style.float = "right";
		temp_elem.innerHTML = "No";
		temp_elem.addEventListener("click", function()
		{
			document.getElementById("popup_div").style.display = "none";
		});
		document.getElementById("popup_div").appendChild(temp_elem);

		temp_elem = document.createElement("br");
		document.getElementById("popup_div").appendChild(temp_elem);
	
		temp_elem = document.createElement("br");
		document.getElementById("popup_div").appendChild(temp_elem);
	});
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	// start of Latin New Testament

	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	elem = document.createElement("p");
	elem.id = "latin_para";
	elem.innerHTML = "<b><i>Vulg. Latin</i></b> &#9660;";
	document.getElementById("main_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	elem = document.createElement("div");
	elem.id = "latin_holder_div";
	elem.style.backgroundColor = open_options_background_color;
	elem.style.display = "none";
	document.getElementById("main_div").appendChild(elem);

	for (var elem_loop=0; elem_loop<open_nt_name_listing.length; elem_loop++)
	{
		elem = document.createElement("label");
		elem.setAttribute("class", "latin_book_title");
		elem.setAttribute("data-book", elem_loop);
		elem.setAttribute("data-book-name", open_nt_name_listing[elem_loop]);
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_menu_font + "px";
		elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;" + open_nt_name_listing[elem_loop] + "</b>";
		document.getElementById("latin_holder_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("latin_holder_div").appendChild(elem);

		parent = document.createElement("div");
		parent.id = "latin_" + open_nt_name_listing[elem_loop] + "_holder_div";
		parent.style.backgroundColor = open_options_background_color;
		parent.style.display = "none";
		document.getElementById("latin_holder_div").appendChild(parent);

		for (var range_loop=1; range_loop<=open_nt_range_listing[elem_loop]; range_loop++)
		{
			elem = document.createElement("span");
			elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			parent.appendChild(elem);

			elem = document.createElement("a");
			elem.setAttribute("class", "latin_chapter_button");
			elem.setAttribute("data-mode", "latin");
			elem.setAttribute("data-book", elem_loop);
			elem.setAttribute("data-book-name", open_nt_name_listing[elem_loop]);
			elem.setAttribute("data-chapter", range_loop);
			elem.href = "#";
			elem.style.color = open_options_text_color;
			elem.style.fontSize = open_options_menu_font + "px";
			elem.innerHTML = open_nt_name_listing[elem_loop] + (open_nt_range_listing[elem_loop] > 1 ? " " + range_loop : "");
			parent.appendChild(elem);

			elem = document.createElement("br");
			parent.appendChild(elem);
		}
	}

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;----</b>";
	document.getElementById("latin_holder_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("latin_holder_div").appendChild(elem);
	
	elem = document.createElement("label");
	elem.id = "latin_tools_label";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;Tools</b>";
	document.getElementById("latin_holder_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("latin_holder_div").appendChild(elem);

	parent = document.createElement("div");
	parent.id = "latin_tools_holder_div";
	parent.style.backgroundColor = open_options_background_color;
	parent.style.display = "none";
	document.getElementById("latin_holder_div").appendChild(parent);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	parent.appendChild(elem);
	
	elem = document.createElement("a");
	elem.id = "latin_tools_search_anchor";
	elem.setAttribute("data-mode", "latin_tools");
	elem.setAttribute("data-book", 0);
	elem.setAttribute("data-book-name", "Latin Search");
	elem.setAttribute("data-chapter", 1);
	elem.href = "#";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "Latin Search";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	for (var dict_loop=1; dict_loop<=27; dict_loop++)
	{
		elem = document.createElement("span");
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_menu_font + "px";
		elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		parent.appendChild(elem);
	
		elem = document.createElement("a");
		elem.setAttribute("class", "dictionary_button");
		elem.setAttribute("data-mode", "latin_tools");
		elem.setAttribute("data-book", 1);
		elem.setAttribute("data-book-name", "Latin Dictionary");
		elem.setAttribute("data-chapter", dict_loop);
		elem.href = "#";
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_menu_font + "px";
		if (dict_loop == 27)
		{
			elem.innerHTML = "Latin Dictionary - Others";
		}
		else
		{
			elem.innerHTML = "Latin Dictionary - &#" + parseInt(65 + dict_loop-1) + ";";
		}
		parent.appendChild(elem);
	
		elem = document.createElement("br");
		parent.appendChild(elem);
	}

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Set Glosses to Word Count";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Set to: ";
	parent.appendChild(elem);
	
	elem = document.createElement("input");
	elem.type = "number";
	elem.style.width = "80px";
	elem.style.height = "30px";
	elem.value = "30";
	elem.id = "options_set_latin_glosses_input";
	parent.appendChild(elem);

	elem = document.createElement("button");
	elem.innerHTML = "Set";
	elem.addEventListener("click", function(event)
	{
		open_latin_gloss_word_count = parseInt(document.getElementById("options_set_latin_glosses_input").value);

		localStorage.setItem("myLatinGlossWordCount", open_latin_gloss_word_count);

		document.getElementById("return_button").click();
	});
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	// start of Options

	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	elem = document.createElement("p");
	elem.id = "options_para";
	elem.innerHTML = "<b><i>Options</i></b> &#9660;";
	document.getElementById("main_div").appendChild(elem);
	
	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	parent = document.createElement("div");
	parent.id = "options_holder_div";
	parent.style.backgroundColor = open_options_background_color;
	parent.style.display = "none";
	document.getElementById("main_div").appendChild(parent);

	table_elem = document.createElement("table");
	parent.appendChild(table_elem);
	
	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Popup Pixel Width: ";
	td_elem.appendChild(elem);
	
	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("input");
	elem.type = "number";
	elem.style.width = "80px";
	elem.style.height = "30px";
	elem.value = open_options_popup_width;
	elem.id = "options_popup_width_input";
	td_elem.appendChild(elem);
	
	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;English Font Size: ";
	td_elem.appendChild(elem);
	
	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("input");
	elem.type = "number";
	elem.style.width = "60px";
	elem.style.height = "30px";
	elem.value = open_options_english_font;
	elem.id = "options_english_font_input";
	td_elem.appendChild(elem);

	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Hebrew Font Size: ";
	td_elem.appendChild(elem);
	
	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("input");
	elem.type = "number";
	elem.style.width = "60px";
	elem.style.height = "30px";
	elem.value = open_options_hebrew_font;
	elem.id = "options_hebrew_font_input";
	td_elem.appendChild(elem);
	
	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Greek Font Size: ";
	td_elem.appendChild(elem);
	
	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);
	
	elem = document.createElement("input");
	elem.type = "number";
	elem.style.width = "60px";
	elem.style.height = "30px";
	elem.value = open_options_greek_font;
	elem.id = "options_greek_font_input";
	td_elem.appendChild(elem);

	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Latin Font Size: ";
	td_elem.appendChild(elem);
	
	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);
	
	elem = document.createElement("input");
	elem.type = "number";
	elem.style.width = "60px";
	elem.style.height = "30px";
	elem.value = open_options_latin_font;
	elem.id = "options_latin_font_input";
	td_elem.appendChild(elem);
	
	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Gloss Font Size: ";
	td_elem.appendChild(elem);
	
	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("input");
	elem.type = "number";
	elem.style.width = "60px";
	elem.style.height = "30px";
	elem.value = open_options_gloss_font;
	elem.id = "options_gloss_font_input";
	td_elem.appendChild(elem);
	
	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Popup Font Size: ";
	td_elem.appendChild(elem);
	
	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("input");
	elem.type = "number";
	elem.style.width = "60px";
	elem.style.height = "30px";
	elem.value = open_options_popup_font;
	elem.id = "options_popup_font_input";
	td_elem.appendChild(elem);
	
//	tr_elem = document.createElement("tr");
//	table_elem.appendChild(tr_elem);

//	td_elem = document.createElement("td");
//	tr_elem.appendChild(td_elem);

//	elem = document.createElement("span");
//	elem.style.color = open_options_text_color;
//	elem.style.fontSize = open_options_menu_font + "px";
//	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Menu Font Size: ";
//	td_elem.appendChild(elem);
	
//	td_elem = document.createElement("td");
//	tr_elem.appendChild(td_elem);

//	elem = document.createElement("input");
//	elem.type = "number";
//	elem.style.width = "60px";
//	elem.style.height = "30px";
//	elem.value = open_options_menu_font;
//	elem.id = "options_menu_font_input";
//	td_elem.appendChild(elem);
	
	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Text Color: ";
	td_elem.appendChild(elem);
	
	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("select");
	elem.style.width = "100px";
	elem.style.height = "30px";
	elem.id = "options_text_color_input";
	td_elem.appendChild(elem);

	for (var colors_loop=0; colors_loop<open_html_colors.length; colors_loop++)
	{
		elem = document.createElement("option");
		elem.innerHTML = open_html_colors[colors_loop];
		elem.value = open_html_colors[colors_loop];
		document.getElementById("options_text_color_input").appendChild(elem);
	}
	document.getElementById("options_text_color_input").value = open_options_text_color;
	
	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Jesus Text Color: ";
	td_elem.appendChild(elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("select");
	elem.style.width = "100px";
	elem.style.height = "30px";
	elem.id = "options_jesus_color_input";
	td_elem.appendChild(elem);

	for (var colors_loop=0; colors_loop<open_html_colors.length; colors_loop++)
	{
		elem = document.createElement("option");
		elem.innerHTML = open_html_colors[colors_loop];
		elem.value = open_html_colors[colors_loop];
		document.getElementById("options_jesus_color_input").appendChild(elem);
	}
	document.getElementById("options_jesus_color_input").value = open_options_jesus_color;
	
	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Background Color: ";
	td_elem.appendChild(elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("select");
	elem.style.width = "100px";
	elem.style.height = "30px";
	elem.id = "options_background_color_input";
	td_elem.appendChild(elem);

	for (var colors_loop=0; colors_loop<open_html_colors.length; colors_loop++)
	{
		elem = document.createElement("option");
		elem.innerHTML = open_html_colors[colors_loop];
		elem.value = open_html_colors[colors_loop];
		document.getElementById("options_background_color_input").appendChild(elem);
	}
	document.getElementById("options_background_color_input").value = open_options_background_color;
	
	elem = document.createElement("br");
	parent.appendChild(elem);
	
	tr_elem = document.createElement("tr");
	table_elem.appendChild(tr_elem);

	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Polytonic Greek: ";
	td_elem.appendChild(elem);
	
	elem = document.createElement("br");
	td_elem.appendChild(elem);
	
	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
	td_elem.appendChild(elem);
	
	elem = document.createElement("span");
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_popup_font + "px";
	elem.innerHTML = "(select 'No' for older devices)";
	td_elem.appendChild(elem);
	
	td_elem = document.createElement("td");
	tr_elem.appendChild(td_elem);

	elem = document.createElement("select");
	elem.style.width = "60px";
	elem.style.height = "30px";
	elem.id = "options_greek_polytonic_input";
	td_elem.appendChild(elem);
	
	elem = document.createElement("option");
	elem.innerHTML = "Yes";
	elem.value = "yes";
	document.getElementById("options_greek_polytonic_input").appendChild(elem);
	
	elem = document.createElement("option");
	elem.innerHTML = "No";
	elem.value = "no";
	document.getElementById("options_greek_polytonic_input").appendChild(elem);
	
	document.getElementById("options_greek_polytonic_input").value = open_options_greek_polytonic;
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	elem = document.createElement("label");
	elem.id = "options_about_label";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_menu_font + "px";
	elem.innerHTML = "<b>&nbsp;&nbsp;&nbsp;&nbsp;About</b>";
	parent.appendChild(elem);
	
	elem = document.createElement("br");
	parent.appendChild(elem);

	elem = document.createElement("div");
	elem.id = "options_about_holder_div";
	elem.style.color = open_options_text_color;
	elem.style.fontSize = open_options_english_font + "px";
	elem.style.backgroundColor = open_options_background_color;
	elem.style.display = "none";
	elem.innerHTML = 
		"<i><br>This app was created by Steven Chad Burrow, " +
			"with extensive help from Rebecca Burrow, Nick Vahalik, Landon Hebison, and Anderson Fernandes.<br><br>" +
		"The King James Version of the Bible is used for the English.<br><br>" +
		"(For assistance with archaic words, the World English Bible is used within the KJV sections.)<br><br>" +
		"The Hebrew Old Testament used is the Masoretic Text.<br><br>" +
		"The Greek New Testament used is the Byzantine 'Majority' Text from Robinson and Pierpont, " +
			"with Textus Receptus variants in brackets.<br><br>" +
		"The Latin New Testament used is the Clementine Vulgate, originally written by Jerome, " +
			"with the translations coming from the Whitaker's WORDS program.<br><br>" +
		"All of the data files used were created by Steven Chad Burrow or are in the public domain.<br><br>" +
		"The current version of this app is: " + open_app_version + "<br><br>" +
		"If you need help, or wish to have a physical book similar to this app, " +
			"email me at: stevenchadburrow@gmail.com<br></i>";
	parent.appendChild(elem);

	elem = document.createElement("br");
	parent.appendChild(elem);

	setTimeout(function()
	{
		var list, text;

		document.getElementById("english_para").addEventListener("click", function()
		{
			if (document.getElementById("english_holder_div").style.display == "none")
			{
				document.getElementById("english_holder_div").style.display = "inline";

				text = document.getElementById("english_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("english_para").innerHTML = text.join(" ") + " &#9650;";
			}
			else
			{
				document.getElementById("english_holder_div").style.display = "none";

				text = document.getElementById("english_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("english_para").innerHTML = text.join(" ") + " &#9660;";
			}
		});

		document.getElementById("hebrew_para").addEventListener("click", function()
		{
			if (document.getElementById("hebrew_holder_div").style.display == "none")
			{
				document.getElementById("hebrew_holder_div").style.display = "inline";

				text = document.getElementById("hebrew_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("hebrew_para").innerHTML = text.join(" ") + " &#9650;";
			}
			else
			{
				document.getElementById("hebrew_holder_div").style.display = "none";

				text = document.getElementById("hebrew_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("hebrew_para").innerHTML = text.join(" ") + " &#9660;";
			}
		});

		document.getElementById("greek_para").addEventListener("click", function()
		{
			if (document.getElementById("greek_holder_div").style.display == "none")
			{
				document.getElementById("greek_holder_div").style.display = "inline";

				text = document.getElementById("greek_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("greek_para").innerHTML = text.join(" ") + " &#9650;";
			}
			else
			{
				document.getElementById("greek_holder_div").style.display = "none";
		
				text = document.getElementById("greek_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("greek_para").innerHTML = text.join(" ") + " &#9660;";
			}
		});

		document.getElementById("latin_para").addEventListener("click", function()
		{
			if (document.getElementById("latin_holder_div").style.display == "none")
			{
				document.getElementById("latin_holder_div").style.display = "inline";

				text = document.getElementById("latin_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("latin_para").innerHTML = text.join(" ") + " &#9650;";
			}
			else
			{
				document.getElementById("latin_holder_div").style.display = "none";
		
				text = document.getElementById("latin_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("latin_para").innerHTML = text.join(" ") + " &#9660;";
			}
		});

		list = document.getElementsByClassName("english_book_title");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				if (document.getElementById("english_" + this.getAttribute("data-book-name") + "_holder_div").style.display == "none")
				{
					document.getElementById("english_" + this.getAttribute("data-book-name") + "_holder_div").style.display = "inline";
				}
				else
				{
					document.getElementById("english_" + this.getAttribute("data-book-name") + "_holder_div").style.display = "none";
				}
			});
		}

		list = document.getElementsByClassName("hebrew_book_title");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				if (document.getElementById("hebrew_" + this.getAttribute("data-book-name") + "_holder_div").style.display == "none")
				{
					document.getElementById("hebrew_" + this.getAttribute("data-book-name") + "_holder_div").style.display = "inline";
				}
				else
				{
					document.getElementById("hebrew_" + this.getAttribute("data-book-name") + "_holder_div").style.display = "none";
				}
			});
		}

		list = document.getElementsByClassName("greek_book_title");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				if (document.getElementById("greek_" + this.getAttribute("data-book-name") + "_holder_div").style.display == "none")
				{
					document.getElementById("greek_" + this.getAttribute("data-book-name") + "_holder_div").style.display = "inline";
				}
				else
				{
					document.getElementById("greek_" + this.getAttribute("data-book-name") + "_holder_div").style.display = "none";
				}
			});
		}

		list = document.getElementsByClassName("latin_book_title");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				if (document.getElementById("latin_" + this.getAttribute("data-book-name") + "_holder_div").style.display == "none")
				{
					document.getElementById("latin_" + this.getAttribute("data-book-name") + "_holder_div").style.display = "inline";
				}
				else
				{
					document.getElementById("latin_" + this.getAttribute("data-book-name") + "_holder_div").style.display = "none";
				}
			});
		}

		list = document.getElementsByClassName("english_chapter_button");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				localStorage.setItem("myMode", this.getAttribute("data-mode"));
				localStorage.setItem("myBook", this.getAttribute("data-book"));
				localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

				document.getElementById("return_button").click();
			});
		}

		list = document.getElementsByClassName("hebrew_chapter_button");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				localStorage.setItem("myMode", this.getAttribute("data-mode"));
				localStorage.setItem("myBook", this.getAttribute("data-book"));
				localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

				document.getElementById("return_button").click();
			});
		}

		list = document.getElementsByClassName("greek_chapter_button");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				localStorage.setItem("myMode", this.getAttribute("data-mode"));
				localStorage.setItem("myBook", this.getAttribute("data-book"));
				localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

				document.getElementById("return_button").click();
			});
		}

		list = document.getElementsByClassName("latin_chapter_button");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				localStorage.setItem("myMode", this.getAttribute("data-mode"));
				localStorage.setItem("myBook", this.getAttribute("data-book"));
				localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

				document.getElementById("return_button").click();
			});
		}

		document.getElementById("english_tools_label").addEventListener("click", function()
		{
			if (document.getElementById("english_tools_holder_div").style.display == "none")
			{
				document.getElementById("english_tools_holder_div").style.display = "inline";
			}
			else
			{
				document.getElementById("english_tools_holder_div").style.display = "none";
			}
		});

		document.getElementById("english_tools_search_anchor").addEventListener("click", function()
		{
			localStorage.setItem("myMode", this.getAttribute("data-mode"));
			localStorage.setItem("myBook", this.getAttribute("data-book"));
			localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

			document.getElementById("return_button").click();
		});

		document.getElementById("english_tools_random_anchor").addEventListener("click", function()
		{
			localStorage.setItem("myMode", this.getAttribute("data-mode"));
			localStorage.setItem("myBook", this.getAttribute("data-book"));
			localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

			document.getElementById("return_button").click();
		});

		document.getElementById("greek_tools_label").addEventListener("click", function()
		{
			if (document.getElementById("greek_tools_holder_div").style.display == "none")
			{
				document.getElementById("greek_tools_holder_div").style.display = "inline";
			}
			else
			{
				document.getElementById("greek_tools_holder_div").style.display = "none";
			}
		});

		document.getElementById("greek_tools_search_anchor").addEventListener("click", function()
		{
			localStorage.setItem("myMode", this.getAttribute("data-mode"));
			localStorage.setItem("myBook", this.getAttribute("data-book"));
			localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

			document.getElementById("return_button").click();
		});

		document.getElementById("greek_tools_grammar_anchor").addEventListener("click", function()
		{
			localStorage.setItem("myMode", this.getAttribute("data-mode"));
			localStorage.setItem("myBook", this.getAttribute("data-book"));
			localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

			document.getElementById("return_button").click();
		});

		list = document.getElementsByClassName("lexicon_button");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				localStorage.setItem("myMode", this.getAttribute("data-mode"));
				localStorage.setItem("myBook", this.getAttribute("data-book"));
				localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

				document.getElementById("return_button").click();
			});
		}

		document.getElementById("latin_tools_label").addEventListener("click", function()
		{
			if (document.getElementById("latin_tools_holder_div").style.display == "none")
			{
				document.getElementById("latin_tools_holder_div").style.display = "inline";
			}
			else
			{
				document.getElementById("latin_tools_holder_div").style.display = "none";
			}
		});

		document.getElementById("latin_tools_search_anchor").addEventListener("click", function()
		{
			localStorage.setItem("myMode", this.getAttribute("data-mode"));
			localStorage.setItem("myBook", this.getAttribute("data-book"));
			localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

			document.getElementById("return_button").click();
		});

		list = document.getElementsByClassName("dictionary_button");
		
		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function()
			{
				localStorage.setItem("myMode", this.getAttribute("data-mode"));
				localStorage.setItem("myBook", this.getAttribute("data-book"));
				localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

				document.getElementById("return_button").click();
			});
		}

		document.getElementById("hebrew_tools_label").addEventListener("click", function()
		{
			if (document.getElementById("hebrew_tools_holder_div").style.display == "none")
			{
				document.getElementById("hebrew_tools_holder_div").style.display = "inline";
			}
			else
			{
				document.getElementById("hebrew_tools_holder_div").style.display = "none";
			}
		});

		document.getElementById("hebrew_tools_search_anchor").addEventListener("click", function()
		{
			localStorage.setItem("myMode", this.getAttribute("data-mode"));
			localStorage.setItem("myBook", this.getAttribute("data-book"));
			localStorage.setItem("myChapter", this.getAttribute("data-chapter"));

			document.getElementById("return_button").click();
		});

		document.getElementById("options_para").addEventListener("click", function()
		{
			if (document.getElementById("options_holder_div").style.display == "none")
			{
				document.getElementById("options_holder_div").style.display = "inline";

				text = document.getElementById("options_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("options_para").innerHTML = text.join(" ") + " &#9650;";
			}
			else
			{
				document.getElementById("options_holder_div").style.display = "none";

				text = document.getElementById("options_para").innerHTML.split(" ");
				text.pop();

				document.getElementById("options_para").innerHTML = text.join(" ") + " &#9660;";
			}
		});

		document.getElementById("options_about_label").addEventListener("click", function()
		{
			if (document.getElementById("options_about_holder_div").style.display == "none")
			{
				document.getElementById("options_about_holder_div").style.display = "inline";
			}
			else
			{
				document.getElementById("options_about_holder_div").style.display = "none";
			}
		});

	}, 250);
});

document.getElementById("switch_select").addEventListener("change", function()
{
	if (this.value == "english")
	{
		if (localStorage.getItem("myMode") == "hebrew")
		{
			localStorage.setItem("myMode", "english_ot");
		}
		else if (localStorage.getItem("myMode") == "greek" || localStorage.getItem("myMode") == "latin")
		{
			localStorage.setItem("myMode", "english_nt");
		}
	}
	else if (this.value == "hebrew")
	{
		localStorage.setItem("myMode", "hebrew");
	}
	else if (this.value == "greek")
	{
		localStorage.setItem("myMode", "greek");
	}
	else if (this.value == "latin")
	{
		localStorage.setItem("myMode", "latin");
	}

	document.getElementById("top_div").style.display = "none";
	document.getElementById("bottom_div").style.display = "none";
	document.getElementById("popup_div").style.display = "none";

	document.getElementById("loading_div").style.display = "block";

	document.getElementById("main_div").innerHTML = "";

	Initialize();	
});

document.getElementById("search_button").addEventListener("click", function()
{
	clearInterval(open_external_loop_interval);
	clearInterval(open_external_inner_interval);
	clearInterval(open_search_text_interval);

	if (open_current_mode == "english_tools" || open_current_mode == "greek_tools" || 
		open_current_mode == "latin_tools" || open_current_mode == "hebrew_tools")
	{
		if (!(localStorage.getItem("myLastMode") == null ||
			localStorage.getItem("myLastBook") == null ||
			localStorage.getItem("myLastChapter") == null))
		{
			localStorage.setItem("myMode", localStorage.getItem("myLastMode"));
			localStorage.setItem("myBook", localStorage.getItem("myLastBook"));
			localStorage.setItem("myChapter", localStorage.getItem("myLastChapter"));

			document.getElementById("top_div").style.display = "none";
			document.getElementById("bottom_div").style.display = "none";
			document.getElementById("popup_div").style.display = "none";

			document.getElementById("loading_div").style.display = "block";

			document.getElementById("main_div").innerHTML = "";

			Initialize();
		}	
	}
	else
	{
		if (open_current_mode == "english_ot" || open_current_mode == "english_nt")
		{
			localStorage.setItem("myMode", "english_tools");
		}
		else if (open_current_mode == "greek")
		{
			localStorage.setItem("myMode", "greek_tools");
		}
		else if (open_current_mode == "latin")
		{
			localStorage.setItem("myMode", "latin_tools");
		}
		else if (open_current_mode == "hebrew")
		{
			localStorage.setItem("myMode", "hebrew_tools");
		}	
		localStorage.setItem("myBook", 0);
		localStorage.setItem("myChapter", 1);

		document.getElementById("top_div").style.display = "none";
		document.getElementById("bottom_div").style.display = "none";
		document.getElementById("popup_div").style.display = "none";

		document.getElementById("loading_div").style.display = "block";

		document.getElementById("main_div").innerHTML = "";

		Initialize();	
	}
});

document.getElementById("top_prev_button").addEventListener("click", function()
{
	clearInterval(open_external_loop_interval);
	clearInterval(open_external_inner_interval);
	clearInterval(open_search_text_interval);

	open_current_chapter--;

	if (open_current_mode == "greek_tools" && open_current_book == 2 && open_current_chapter == 18)
	{
		open_current_chapter--;
	}

	if (open_current_chapter < 1)
	{
		var init_flag = false;

		if (open_current_mode == "english_ot")
		{
			if (open_current_book == 0)
			{
				init_flag = false;
			}
			else
			{
				open_current_book--;
				open_current_chapter = open_ot_range_listing[open_current_book];

				init_flag = true;
			}
		}
		else if (open_current_mode == "english_nt")
		{
			if (open_current_book == 0)
			{
				open_current_mode = "english_ot";
				open_current_book = open_ot_name_listing.length-1;
				open_current_chapter = open_ot_range_listing[open_current_book];
			
				init_flag = true;
			}
			else
			{
				open_current_book--;
				open_current_chapter = open_nt_range_listing[open_current_book];

				init_flag = true;
			}
		}
		else if (open_current_mode == "hebrew")
		{
			if (open_current_book == 0)
			{
				init_flag = false;
			}
			else
			{
				open_current_book--;
				open_current_chapter = open_ot_range_listing[open_current_book];

				init_flag = true;
			}
		}
		else if (open_current_mode == "greek")
		{
			if (open_current_book == 0)
			{
				init_flag = false;
			}
			else
			{
				open_current_book--;
				open_current_chapter = open_nt_range_listing[open_current_book];

				init_flag = true;
			}
		}
		else if (open_current_mode == "greek_tools")
		{
			if (open_current_book == 2)
			{
				init_flag = false;
			}
		}
		else if (open_current_mode == "latin")
		{
			if (open_current_book == 0)
			{
				init_flag = false;
			}
			else
			{
				open_current_book--;
				open_current_chapter = open_nt_range_listing[open_current_book];

				init_flag = true;
			}
		}
		else if (open_current_mode == "latin_tools")
		{
			if (open_current_book == 1)
			{
				init_flag = false;
			}
		}
		
		if (init_flag == true)
		{
			localStorage.setItem("myMode", open_current_mode);
			localStorage.setItem("myBook", open_current_book);
			localStorage.setItem("myChapter", open_current_chapter);

			document.getElementById("top_div").style.display = "none";
			document.getElementById("bottom_div").style.display = "none";
			document.getElementById("popup_div").style.display = "none";

			document.getElementById("loading_div").style.display = "block";

			document.getElementById("main_div").innerHTML = "";

			document.location.href = document.location.href.split("#")[0] + "#";

			Initialize();

			return;
		}
		else
		{
			open_current_chapter = 1;
		}
	}
	
	localStorage.setItem("myChapter", open_current_chapter);

	document.location.href = document.location.href.split("#")[0] + "#";

	document.getElementById("popup_div").style.display = "none";

	document.getElementById("top_div").style.display = "none";
	document.getElementById("bottom_div").style.display = "none";
	document.getElementById("main_div").innerHTML = "";

	document.getElementById("loading_div").style.display = "block";

	setTimeout(function()
	{
		document.getElementById("loading_div").style.display = "none";

		if (open_current_mode == "english_nt" || open_current_mode == "english_ot") Print();
		else if (open_current_mode == "hebrew") Scribe();
		else if (open_current_mode == "greek") Show();
		else if (open_current_mode == "greek_tools") Display();
		else if (open_current_mode == "latin") Paint();
		else if (open_current_mode == "latin_tools") Display();

	}, 250);
});

document.getElementById("top_next_button").addEventListener("click", function()
{
	clearInterval(open_external_loop_interval);
	clearInterval(open_external_inner_interval);
	clearInterval(open_search_text_interval);

	open_current_chapter++;

	if (open_current_mode == "greek_tools" && open_current_book == 2 && open_current_chapter == 18)
	{
		open_current_chapter++;
	}

	if (((open_current_mode == "english_nt" || open_current_mode == "greek" || open_current_mode == "latin") && 
		open_current_chapter > open_nt_range_listing[open_current_book]) ||
		((open_current_mode == "english_ot" || open_current_mode == "hebrew") &&
		open_current_chapter > open_ot_range_listing[open_current_book]) ||
		(open_current_mode == "greek_tools" && open_current_chapter > 26) ||
		(open_current_mode == "latin_tools" && open_current_chapter > 27))
	{
		var init_flag = false;

		if (open_current_mode == "english_ot")
		{
			if (open_current_book == open_ot_name_listing.length-1)
			{
				open_current_mode = "english_nt";
				open_current_book = 0;
				open_current_chapter = 1;

				init_flag = true;
			}
			else
			{
				open_current_book++;
				open_current_chapter = 1;

				init_flag = true;
			}
		}
		else if (open_current_mode == "english_nt")
		{
			if (open_current_book == open_nt_name_listing.length-1)
			{
				init_flag = false;
			}
			else
			{
				open_current_book++;
				open_current_chapter = 1;

				init_flag = true;
			}
		}
		else if (open_current_mode == "hebrew")
		{
			if (open_current_book == open_ot_name_listing.length-1)
			{
				init_flag = false;
			}
			else
			{
				open_current_book++;
				open_current_chapter = 1;

				init_flag = true;
			}
		}
		else if (open_current_mode == "greek")
		{
			if (open_current_book == open_nt_name_listing.length-1)
			{
				init_flag = false;
			}
			else
			{
				open_current_book++;
				open_current_chapter = 1;

				init_flag = true;
			}
		}
		else if (open_current_mode == "greek_tools")
		{
			if (open_current_book == 2)
			{
				init_flag = false;
			}
		}
		else if (open_current_mode == "latin")
		{
			if (open_current_book == open_nt_name_listing.length-1)
			{
				init_flag = false;
			}
			else
			{
				open_current_book++;
				open_current_chapter = 1;

				init_flag = true;
			}
		}
		else if (open_current_mode == "latin_tools")
		{
			if (open_current_book == 1)
			{
				init_flag = false;
			}
		}
		
		if (init_flag == true)
		{
			localStorage.setItem("myMode", open_current_mode);
			localStorage.setItem("myBook", open_current_book);
			localStorage.setItem("myChapter", open_current_chapter);

			document.getElementById("top_div").style.display = "none";
			document.getElementById("bottom_div").style.display = "none";
			document.getElementById("popup_div").style.display = "none";

			document.getElementById("loading_div").style.display = "block";

			document.getElementById("main_div").innerHTML = "";

			document.location.href = document.location.href.split("#")[0] + "#";

			Initialize();

			return;
		}
		else
		{
			if (open_current_mode == "english_ot" || open_current_mode == "hebrew")
			{
				open_current_chapter = open_ot_range_listing[open_current_book];
			}
			else if (open_current_mode == "english_nt" || open_current_mode == "greek" || open_current_mode == "latin")
			{
				open_current_chapter = open_nt_range_listing[open_current_book];
			}
			else if (open_current_mode == "greek_tools" && open_current_book == 2)
			{
				open_current_chapter = 26;
			}
			else if (open_current_mode == "latin_tools" && open_current_book == 1)
			{
				open_current_chapter = 27;
			}
		}
	}

	localStorage.setItem("myChapter", open_current_chapter);

	document.location.href = document.location.href.split("#")[0] + "#";

	document.getElementById("popup_div").style.display = "none";

	document.getElementById("top_div").style.display = "none";
	document.getElementById("bottom_div").style.display = "none";
	document.getElementById("main_div").innerHTML = "";

	document.getElementById("loading_div").style.display = "block";

	setTimeout(function()
	{
		document.getElementById("loading_div").style.display = "none";

		if (open_current_mode == "english_nt" || open_current_mode == "english_ot") Print();
		else if (open_current_mode == "hebrew") Scribe();
		else if (open_current_mode == "greek") Show();
		else if (open_current_mode == "greek_tools") Display();
		else if (open_current_mode == "latin") Paint();
		else if (open_current_mode == "latin_tools") Display();

	}, 250);
});

document.getElementById("bottom_prev_button").addEventListener("click", function()
{
	document.getElementById("top_prev_button").click();
});

document.getElementById("bottom_next_button").addEventListener("click", function()
{
	document.getElementById("top_next_button").click();
});

function Initialize()
{
	if (localStorage.getItem("myMode") == null)
	{
		open_current_mode = "english_nt";
		localStorage.setItem("myMode", open_current_mode);
	}
	else
	{
		open_current_mode = localStorage.getItem("myMode");
	}

	if (localStorage.getItem("myBook") == null)
	{
		open_current_book = 0;
		localStorage.setItem("myBook", open_current_book);
	}
	else
	{
		open_current_book = parseInt(localStorage.getItem("myBook"));
	}
	
	if (localStorage.getItem("myChapter") == null)
	{
		open_current_chapter = 1;
		localStorage.setItem("myChapter", open_current_chapter);
	}
	else
	{
		open_current_chapter = parseInt(localStorage.getItem("myChapter"));
	}

	for (var gloss_loop=0; gloss_loop<=5625; gloss_loop++)
	{
		if (localStorage.getItem("myGlossView" + gloss_loop) == null)
		{
			localStorage.setItem("myGlossView" + gloss_loop, "show");
		}
		else
		{
			open_gloss_view_array[gloss_loop] = localStorage.getItem("myGlossView" + gloss_loop);
		}
	}

	for (var gloss_loop=0; gloss_loop<=5625; gloss_loop++)
	{
		if (localStorage.getItem("myGlossTrans" + gloss_loop) == null)
		{
			localStorage.setItem("myGlossTrans" + gloss_loop, "");
		}
		else
		{
			open_gloss_trans_array[gloss_loop] = localStorage.getItem("myGlossTrans" + gloss_loop);
		}
	}
	
	if (open_flag_greek_data_loaded == false)
	{
		open_flag_greek_data_loaded = true;

		open_greek_count_array.push(0);
		open_greek_roots_array.push("");
		open_greek_translations_array.push("");	
	
		for (var strongs_loop=1; strongs_loop<=5625; strongs_loop++)
		{
			if (localStorage.getItem("myGreekData" + strongs_loop) == null)
			{
				open_flag_greek_data_loaded = false;
			}
			else
			{
				var temp_list = localStorage.getItem("myGreekData" + strongs_loop).split(" ");
	
				open_greek_count_array[strongs_loop] = temp_list[2];
				open_greek_roots_array[strongs_loop] = temp_list[3];
				open_greek_translations_array[strongs_loop] = localStorage.getItem("myGreekData" + strongs_loop).
					split("$ " + strongs_loop + " " + temp_list[2] + " " + temp_list[3] + " ")[1];
			}
		}
	}

	if (localStorage.getItem("myLatinGlossWordCount") == null)
	{
		open_latin_gloss_word_count = 10000;
		localStorage.setItem("myLatinGlossWordCount", open_latin_gloss_word_count);
	}
	else
	{
		open_latin_gloss_word_count = parseInt(localStorage.getItem("myLatinGlossWordCount"));
	}
	
	if (open_flag_latin_data_loaded == false)
	{
		open_flag_latin_data_loaded = true;

		open_latin_count_array.push(0);
		open_latin_roots_array.push("");
		open_latin_translations_array.push("");	
	
		for (var strongs_loop=1; strongs_loop<=6352; strongs_loop++)
		{
			if (localStorage.getItem("myLatinData" + strongs_loop) == null)
			{
				open_flag_latin_data_loaded = false;
			}
			else
			{
				var temp_list = localStorage.getItem("myLatinData" + strongs_loop).split(" ");
	
				open_latin_id_array[strongs_loop] = temp_list[2];
				open_latin_count_array[strongs_loop] = temp_list[3];

				temp_list = localStorage.getItem("myLatinData" + strongs_loop).split("} {");

				open_latin_roots_array[strongs_loop] = temp_list[0].split("{")[1];
				open_latin_translations_array[strongs_loop] = temp_list[1].split("}")[0];
			}
		}
	}

	if (localStorage.getItem("myPopup") == null)
	{
		open_options_popup_width = 200;
		localStorage.setItem("myPopup", open_options_popup_width);
	}
	else
	{
		open_options_popup_width = parseInt(localStorage.getItem("myPopup"));
	}

	if (localStorage.getItem("myFontEnglish") == null)
	{
		open_options_english_font = 14;
		localStorage.setItem("myFontEnglish", open_options_english_font);
	}
	else
	{
		open_options_english_font = parseInt(localStorage.getItem("myFontEnglish"));
	}

	if (localStorage.getItem("myFontHebrew") == null)
	{
		open_options_hebrew_font = 16;
		localStorage.setItem("myFontHebrew", open_options_hebrew_font);
	}
	else
	{
		open_options_hebrew_font = parseInt(localStorage.getItem("myFontHebrew"));
	}

	if (localStorage.getItem("myFontGreek") == null)
	{
		open_options_greek_font = 16;
		localStorage.setItem("myFontGreek", open_options_greek_font);
	}
	else
	{
		open_options_greek_font = parseInt(localStorage.getItem("myFontGreek"));
	}

	if (localStorage.getItem("myFontLatin") == null)
	{
		open_options_latin_font = 16;
		localStorage.setItem("myFontLatin", open_options_latin_font);
	}
	else
	{
		open_options_latin_font = parseInt(localStorage.getItem("myFontLatin"));
	}

	if (localStorage.getItem("myFontGloss") == null)
	{
		open_options_gloss_font = 10;
		localStorage.setItem("myFontGloss", open_options_gloss_font);
	}
	else
	{
		open_options_gloss_font = parseInt(localStorage.getItem("myFontGloss"));
	}

	if (localStorage.getItem("myFontPopup") == null)
	{
		open_options_popup_font = 12;
		localStorage.setItem("myFontPopup", open_options_popup_font);
	}
	else
	{
		open_options_popup_font = parseInt(localStorage.getItem("myFontPopup"));
	}

	if (localStorage.getItem("myFontMenu") == null)
	{
		open_options_menu_font = 20;
		localStorage.setItem("myFontMenu", open_options_menu_font);
	}
	else
	{
		open_options_menu_font = parseInt(localStorage.getItem("myFontMenu"));
	}

	if (localStorage.getItem("myColorText") == null)
	{
		open_options_text_color = "black";
		localStorage.setItem("myColorText", open_options_text_color);
	}
	else
	{
		open_options_text_color = localStorage.getItem("myColorText");
	}

	if (localStorage.getItem("myColorJesus") == null)
	{
		open_options_jesus_color = "red";
		localStorage.setItem("myColorJesus", open_options_jesus_color);
	}
	else
	{
		open_options_jesus_color = localStorage.getItem("myColorJesus");
	}

	if (localStorage.getItem("myColorBackground") == null)
	{
		open_options_background_color = "white";
		localStorage.setItem("myColorBackground", open_options_background_color);
	}
	else
	{
		open_options_background_color = localStorage.getItem("myColorBackground");
	}
	
	if (localStorage.getItem("myPolytonicGreek") == null)
	{
		open_options_greek_polytonic = "yes";
		localStorage.setItem("myPolytonicGreek", open_options_greek_polytonic);
	}
	else
	{
		open_options_greek_polytonic = localStorage.getItem("myPolytonicGreek");
	}

	if (open_current_mode == "english_nt")
	{
		open_external_stage = 2;
	}
	else if (open_current_mode == "english_ot")
	{
		open_external_stage = 2;
	}
	else if (open_current_mode == "english_tools")
	{
		open_external_stage = 4;
	}
	else if (open_current_mode == "hebrew")
	{
		open_external_stage = 0;
	}
	else if (open_current_mode == "hebrew_tools")
	{
		open_external_stage = 4;
	}
	else if (open_current_mode == "greek")
	{
		open_external_stage = 0;
	}
	else if (open_current_mode == "greek_tools")
	{
		open_external_stage = 4;
	}
	else if (open_current_mode == "latin")
	{
		open_external_stage = 0;
	}
	else if (open_current_mode == "latin_tools")
	{
		open_external_stage = 4;
	}

	clearInterval(open_external_loop_interval);
	clearInterval(open_external_inner_interval);
	clearInterval(open_search_text_interval);

	open_external_loop_interval = setInterval(function()
	{
		Load();
	
		if (open_current_mode == "english_nt")
		{
			if (open_external_stage == 6)
			{
				clearInterval(open_external_loop_interval);
	
				document.getElementById("loading_div").style.display = "none";
	
				Print();
			}
		}
		else if (open_current_mode == "english_ot")
		{
			if (open_external_stage == 6)
			{
				clearInterval(open_external_loop_interval);
	
				document.getElementById("loading_div").style.display = "none";
	
				Print();
			}
		}
		else if (open_current_mode == "english_tools")
		{
			if (open_external_stage == 4)
			{
				clearInterval(open_external_loop_interval);
	
				document.getElementById("loading_div").style.display = "none";
	
				Display();
			}
		}
		else if (open_current_mode == "hebrew")
		{
			if (open_external_stage == 4)
			{
				clearInterval(open_external_loop_interval);
	
				document.getElementById("loading_div").style.display = "none";
	
				Scribe();
			}
		}
		else if (open_current_mode == "hebrew_tools")
		{
			if (open_external_stage == 4)
			{
				clearInterval(open_external_loop_interval);
	
				document.getElementById("loading_div").style.display = "none";
	
				Display();
			}
		}
		else if (open_current_mode == "greek")
		{
			if (open_external_stage == 8 || (open_flag_greek_data_loaded == true && open_external_stage == 6))
			{
				clearInterval(open_external_loop_interval);
	
				document.getElementById("loading_div").style.display = "none";
	
				Show();
			}
		}
		else if (open_current_mode == "greek_tools")
		{
			if (open_external_stage == 8 || (open_flag_greek_data_loaded == true && open_external_stage == 6))
			{
				clearInterval(open_external_loop_interval);
	
				document.getElementById("loading_div").style.display = "none";
	
				Display();
			}
		}
		else if (open_current_mode == "latin")
		{
			if (open_external_stage == 8 || (open_flag_latin_data_loaded == true && open_external_stage == 6))
			{
				clearInterval(open_external_loop_interval);
	
				document.getElementById("loading_div").style.display = "none";
	
				Paint();
			}
		}
		else if (open_current_mode == "latin_tools")
		{
			if (open_external_stage == 8 || (open_flag_latin_data_loaded == true && open_external_stage == 6))
			{
				clearInterval(open_external_loop_interval);
	
				document.getElementById("loading_div").style.display = "none";
	
				Display();
			}
		}

	}, 250);

	return;
};

function Load()
{
	if (open_external_stage % 2 == 1 || open_external_stage >= 8 || 
		(open_current_mode == "hebrew" && open_external_stage >= 4) ||
		((open_current_mode == "english_nt" || open_current_mode == "english_ot") && open_external_stage >= 6) ||
		open_current_mode == "english_tools" || open_current_mode == "hebrew_tools") return;

	open_external_string.value = "";

	var request = new XMLHttpRequest();

	var url_string = "";

	if (open_external_stage == 0)
	{
		if (open_current_mode == "hebrew")
		{
			url_string = "Data/" + open_ot_name_listing[open_current_book].replace(" ", "").replace(" ", "") + "Hebrew.txt";
		}
		else if (open_current_mode == "greek")
		{
			url_string = "Data/" + open_nt_name_listing[open_current_book].replace(" ", "").replace(" ", "") + "Greek.txt";
		}
		else if (open_current_mode == "latin")
		{
			url_string = "Data/" + open_nt_name_listing[open_current_book].replace(" ", "").replace(" ", "") + "Latin.txt";
		}
	}
	else if (open_external_stage == 2)
	{
		if (open_current_mode == "greek" || open_current_mode == "latin" || open_current_mode == "english_nt")
		{
			url_string = "Data/" + open_nt_name_listing[open_current_book].replace(" ", "").replace(" ", "") + "English.txt";
		}
		else if (open_current_mode == "hebrew" || open_current_mode == "english_ot")
		{
			url_string = "Data/" + open_ot_name_listing[open_current_book].replace(" ", "").replace(" ", "") + "English.txt";
		}
	}
	else if (open_external_stage == 4)
	{
		if (open_current_mode == "english_nt")
		{
			url_string = "Data/" + open_nt_name_listing[open_current_book].replace(" ", "").replace(" ", "") + "WEB.txt";
		}
		else if (open_current_mode == "english_ot")
		{
			url_string = "Data/" + open_ot_name_listing[open_current_book].replace(" ", "").replace(" ", "") + "WEB.txt";
		}
	}
	else if (open_external_stage == 6)
	{
		if (open_current_mode == "greek" || open_current_mode == "greek_tools")
		{
			if (open_flag_greek_data_loaded == true) return;

			url_string = "Data/GreekData.txt";

			document.getElementById("loading_message_span").innerHTML = "Loading Greek for the first time!<br>This might take a while...";

			setTimeout(function() { document.getElementById("loading_message_span").innerHTML = "Loading..."; }, 5000);
		}
		else if (open_current_mode == "latin" || open_current_mode == "latin_tools")
		{
			if (open_flag_latin_data_loaded == true) return;

			url_string = "Data/LatinData.txt";

			document.getElementById("loading_message_span").innerHTML = "Loading Latin for the first time!<br>This might take a while...";

			setTimeout(function() { document.getElementById("loading_message_span").innerHTML = "Loading..."; }, 5000);
		}
	}

	request.onreadystatechange = function()
	{
		if (request.readyState == 4 && request.status == 200)
		{
			open_external_string.value = request.responseText;
		}
	}
	
	request.open("GET", url_string, true);
	request.overrideMimeType("text/plain");
	request.setRequestHeader("Content-Type", "application/json");
	request.send();

	open_external_stage++;

	clearInterval(open_external_inner_interval);
		
	open_external_inner_interval = setInterval(function()
	{
		var temp_array;

		if (open_external_string.value != "")
		{
			clearInterval(open_external_inner_interval);

			if (open_external_stage == 1)
			{
				if (open_current_mode == "hebrew")
				{
					open_hebrew_array = open_external_string.value.split("\n\n");
				}
				else if (open_current_mode == "greek")
				{
					open_greek_array = open_external_string.value.split("\n\n");
				}
				else if (open_current_mode == "latin")
				{
					open_latin_array = open_external_string.value.split("\n\n");
				}
			}
			else if (open_external_stage == 3)
			{
				open_english_array = open_external_string.value.split("\n\n");

				for (var english_loop=0; english_loop<open_english_array.length; english_loop++)
				{
					while (open_english_array[english_loop].indexOf("  ") != -1)
					{
						open_english_array[english_loop] = open_english_array[english_loop].replace("  ", " ");
					}

					while (open_english_array[english_loop].indexOf(" [ ") != -1)
					{
						open_english_array[english_loop] = open_english_array[english_loop].replace(" [ ", " <i>");
					}

					while (open_english_array[english_loop].indexOf(" ]") != -1)
					{
						open_english_array[english_loop] = open_english_array[english_loop].replace(" ]", "</i>");
					}
	
					while (open_english_array[english_loop].indexOf(" \\ ") != -1)
					{
						open_english_array[english_loop] = open_english_array[english_loop].replace(" \\ ", 
							" <span style='color:" + open_options_jesus_color + "'>");
					}

					while (open_english_array[english_loop].indexOf(" /") != -1)
					{
						open_english_array[english_loop] = open_english_array[english_loop].replace(" /", "</span>");
					}
				}
			}
			else if (open_external_stage == 5)
			{
				open_web_array = open_external_string.value.split("\n\n");

				for (var web_loop=0; web_loop<open_web_array.length; web_loop++)
				{
					while (open_web_array[web_loop].indexOf("  ") != -1)
					{
						open_web_array[web_loop] = open_web_array[web_loop].replace("  ", " ");
					}

					while (open_web_array[web_loop].indexOf("<\"") != -1)
					{
						open_web_array[web_loop] = open_web_array[web_loop].replace("<\"", "\"");
					}

					while (open_web_array[web_loop].indexOf(">\"") != -1)
					{
						open_web_array[web_loop] = open_web_array[web_loop].replace(">\"", "\"");
					}

					while (open_web_array[web_loop].indexOf("<'") != -1)
					{
						open_web_array[web_loop] = open_web_array[web_loop].replace("<'", "'");
					}

					while (open_web_array[web_loop].indexOf(">'") != -1)
					{
						open_web_array[web_loop] = open_web_array[web_loop].replace(">'", "'");
					}
	
					while (open_web_array[web_loop].indexOf("\\ ") != -1)
					{
						open_web_array[web_loop] = open_web_array[web_loop].replace(" \\ ", 
							" <span style='color:" + open_options_jesus_color + "'>");
					}

					while (open_web_array[web_loop].indexOf(" /") != -1)
					{
						open_web_array[web_loop] = open_web_array[web_loop].replace(" /", "</span>");
					}
				}
			}
			else if (open_external_stage == 7)
			{
				temp_array = open_external_string.value.split("\n");

				if (open_current_mode == "greek" || open_current_mode == "greek_tools")
				{
					open_greek_count_array.push(0);
					open_greek_roots_array.push("");
					open_greek_translations_array.push("");
	
					for (var strongs_loop=1; strongs_loop<=5625; strongs_loop++)
					{
						while (open_greek_count_array[strongs_loop] == undefined)
						{
							open_greek_count_array.push("");
						}
	
						while (open_greek_roots_array[strongs_loop] == undefined)
						{
							open_greek_roots_array.push("");
						}
	
						while (open_greek_translations_array[strongs_loop] == undefined)
						{
							open_greek_translations_array.push("");
						}
	
						var discover_flag = false;
	
						for (var temp_loop=0; temp_loop<temp_array.length; temp_loop++)
						{
							if (temp_array[temp_loop].indexOf("$ " + strongs_loop + " ") != -1)
							{
								discover_flag = true;
	
								localStorage.setItem("myGreekData" + strongs_loop, temp_array[temp_loop]);
	
								var temp_list = temp_array[temp_loop].split(" ");
	
								open_greek_count_array[strongs_loop] = temp_list[2];
								open_greek_roots_array[strongs_loop] = temp_list[3];
								open_greek_translations_array[strongs_loop] = temp_array[temp_loop].split("$ " + strongs_loop + " " + 
									temp_list[2] + " " + temp_list[3] + " ")[1];
							}
						}
	
						if (discover_flag == false)
						{
							localStorage.setItem("myGreekData" + strongs_loop, "$ " + strongs_loop + " 0 * -");
						}
					}
	
					open_flag_greek_data_loaded = true;
				}
				else if (open_current_mode == "latin" || open_current_mode == "latin_tools")
				{
					open_latin_count_array.push(0);
					open_latin_roots_array.push("");
					open_latin_translations_array.push("");
	
					for (var strongs_loop=1; strongs_loop<=6352; strongs_loop++)
					{
						while (open_latin_count_array[strongs_loop] == undefined)
						{
							open_latin_count_array.push("");
						}
	
						while (open_latin_roots_array[strongs_loop] == undefined)
						{
							open_latin_roots_array.push("");
						}
	
						while (open_latin_translations_array[strongs_loop] == undefined)
						{
							open_latin_translations_array.push("");
						}
	
						var discover_flag = false;
	
						for (var temp_loop=0; temp_loop<temp_array.length; temp_loop++)
						{
							if (temp_array[temp_loop].indexOf("$ " + strongs_loop + " ") != -1)
							{
								discover_flag = true;
	
								localStorage.setItem("myLatinData" + strongs_loop, temp_array[temp_loop]);
	
								var temp_list = temp_array[temp_loop].split(" ");
	
								open_latin_id_array[strongs_loop] = temp_list[2];
								open_latin_count_array[strongs_loop] = temp_list[3];

								temp_list = temp_array[temp_loop].split("} {");

								open_latin_roots_array[strongs_loop] = temp_list[0].split("{")[1];
								open_latin_translations_array[strongs_loop] = temp_list[1].split("}")[0];
							}
						}
	
						if (discover_flag == false)
						{
							localStorage.setItem("myLatinData" + strongs_loop, "$ " + strongs_loop + " 0 {*} {-}");
						}
					}
	
					open_flag_latin_data_loaded = true;
				}
			}
	
			open_external_string.value = "";

			open_external_stage++;
		}
	
	}, 250);

	return;
};

function Show()
{
	localStorage.setItem("myLastMode", open_current_mode);
	localStorage.setItem("myLastBook", open_current_book);
	localStorage.setItem("myLastChapter", open_current_chapter);

	document.getElementById("main_div").innerHTML = "";

	document.getElementById("top_chapter_span").innerHTML = "<b>" + open_nt_name_listing[open_current_book] + 
		(open_nt_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
	document.getElementById("bottom_chapter_span").innerHTML = "<b>" + open_nt_name_listing[open_current_book] + 
		(open_nt_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
	
	open_current_verse = 1;

	while (Seek() == true)
	{
		open_current_verse++;
	}

	document.getElementById("top_div").style.display = "block";
	document.getElementById("bottom_div").style.display = "block";

	document.getElementById("top_prev_button").style.display = "inline";
	document.getElementById("top_next_button").style.display = "inline";

	document.getElementById("switch_select").style.display = "block";
	document.getElementById("switch_option_english").disabled = false;
	document.getElementById("switch_option_hebrew").disabled = "disabled";
	document.getElementById("switch_option_greek").disabled = false;
	document.getElementById("switch_option_latin").disabled = false;
	document.getElementById("switch_select").value = "greek";

	document.getElementById("search_button").style.display = "block";
	document.getElementById("search_button").innerHTML = "Search";

	document.getElementById("top_div").style.fontSize = open_options_menu_font + "px";
	document.getElementById("bottom_div").style.fontSize = open_options_menu_font + "px";

	document.getElementById("main_div").style.color = open_options_text_color;
	document.getElementById("top_div").style.color = open_options_text_color;
	document.getElementById("bottom_div").style.color = open_options_text_color;
	document.getElementById("popup_div").style.color = open_options_text_color;
	document.getElementById("menu_div").style.color = open_options_text_color;

	document.getElementById("main_div").style.backgroundColor = open_options_background_color;
	document.getElementById("top_div").style.backgroundColor = open_options_background_color;
	document.getElementById("bottom_div").style.backgroundColor = open_options_background_color;
	document.getElementById("popup_div").style.backgroundColor = open_options_background_color;
	document.getElementById("menu_div").style.backgroundColor = open_options_background_color;
	
	document.getElementById("loading_div").style.color = open_options_text_color;
	document.getElementById("loading_div").style.backgroundColor = open_options_background_color;

	document.body.style.backgroundColor = open_options_background_color;

	setTimeout(function()
	{
		var list = document.getElementsByClassName("english_verse");

		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function(event)
			{
				if (event.pageX > window.innerWidth - open_options_popup_width - 20)
				{
					document.getElementById("popup_div").style.left = (window.innerWidth - open_options_popup_width - 20) + "px";
				}
				else
				{
					document.getElementById("popup_div").style.left = event.pageX + "px";
				}

				document.getElementById("popup_div").style.top = event.pageY + "px";
				document.getElementById("popup_div").style.width = open_options_popup_width + "px";

				document.getElementById("popup_div").style.fontSize = open_options_popup_font + "px";
				document.getElementById("popup_div").style.color = open_options_text_color;
			
				document.getElementById("popup_div").innerHTML = this.getAttribute("data-english") + "<br>";
	
				var temp_elem = document.createElement("button");
				temp_elem.innerHTML = "Close";
				temp_elem.addEventListener("click", function()
				{
					document.getElementById("popup_div").style.display = "none";
				});
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
		
				document.getElementById("popup_div").style.display = "inline";
			});
		}

		list = document.getElementsByClassName("greek_word");

		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function(event)
			{
				if (event.pageX > window.innerWidth - open_options_popup_width - 20)
				{
					document.getElementById("popup_div").style.left = (window.innerWidth - open_options_popup_width - 20) + "px";
				}
				else
				{
					document.getElementById("popup_div").style.left = event.pageX + "px";
				}
			
				document.getElementById("popup_div").style.top = event.pageY + "px";
				document.getElementById("popup_div").style.width = open_options_popup_width + "px";

				document.getElementById("popup_div").style.fontSize = open_options_popup_font + "px";
				document.getElementById("popup_div").style.color = open_options_text_color;
			
				document.getElementById("popup_div").innerHTML = this.getAttribute("data-greek") + "<br>";
	
				var temp_elem;

				if (parseInt(this.getAttribute("data-strongs")) != 0)
				{
					temp_elem = document.createElement("input");
					temp_elem.type = "checkbox";
					temp_elem.setAttribute("class", "popup_checkbox");
					temp_elem.setAttribute("data-strongs", this.getAttribute("data-strongs"));
					temp_elem.setAttribute("data-gloss", this.getAttribute("data-gloss"));
					if (open_gloss_view_array[parseInt(this.getAttribute("data-strongs"))] == "show")
					{
						temp_elem.checked = true;
					}
					else temp_elem.checked = false;
					temp_elem.addEventListener("change", function()
					{
						if (this.checked == true)
						{
							open_gloss_view_array[parseInt(this.getAttribute("data-strongs"))] = "show";
							
							localStorage.setItem("myGlossView" + this.getAttribute("data-strongs"), "show");

							var list = document.getElementsByClassName("greek_word");
	
							for (var list_loop=0; list_loop<list.length; list_loop++)
							{
								if (list[list_loop].getAttribute("data-strongs") == this.getAttribute("data-strongs"))
								{
									list[list_loop].getElementsByTagName("td")[1].innerHTML = this.getAttribute("data-gloss");
								}
							}
						}
						else
						{
							open_gloss_view_array[parseInt(this.getAttribute("data-strongs"))] = "hide";
							
							localStorage.setItem("myGlossView" + this.getAttribute("data-strongs"), "hide");

							var list = document.getElementsByClassName("greek_word");
	
							for (var list_loop=0; list_loop<list.length; list_loop++)
							{
								if (list[list_loop].getAttribute("data-strongs") == this.getAttribute("data-strongs"))
								{
									list[list_loop].getElementsByTagName("td")[1].innerHTML = "&nbsp;";
								}
							}
						}
					});
					document.getElementById("popup_div").appendChild(temp_elem);
					
					temp_elem = document.createElement("span");
					temp_elem.innerHTML = " Show Gloss";
					document.getElementById("popup_div").appendChild(temp_elem);
	
					//temp_elem = document.createElement("br");
					//document.getElementById("popup_div").appendChild(temp_elem);
				}	

				temp_elem = document.createElement("button");
				temp_elem.style.float = "right";
				temp_elem.innerHTML = "Close";
				temp_elem.addEventListener("click", function()
				{
					document.getElementById("popup_div").style.display = "none";
				});
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
		
				document.getElementById("popup_div").style.display = "inline";
			});
		}

		if (open_first_load == true)
		{
			open_first_load = false;

			if (localStorage.getItem("myScrollTop"))
			{
				document.body.scrollTop = localStorage.getItem("myScrollTop");
			}
		}
		else
		{
			var temp_elem = document.createElement("a");
			if (document.location.href.indexOf("#") == -1) temp_elem.href = document.location.href + "#";
			else temp_elem.href = document.location.href;
			temp_elem.style.display = "none";
			document.getElementById("main_div").appendChild(temp_elem);
			temp_elem.click();
		}

	}, 250);
	
	return;
};

function Seek()
{
	var elem, parent, temp_row, temp_cell;

	var seek_array = [];

	var seek_flag = false, verse_flag;

	for (var seek_loop=0; seek_loop<open_greek_array.length; seek_loop++)
	{
		if (open_greek_array[seek_loop].indexOf("$ " + open_current_book + ":" + open_current_chapter + ":" + open_current_verse) != -1)
		{
			seek_array = open_greek_array[seek_loop].split(" ").slice(2);

			seek_flag = true;
	
			break; // leave loop
		}
	}
	
	if (seek_flag == false) return false;

	open_current_greek = [];
	open_current_strongs = [];
	open_current_parsing = [];

	for (var seek_loop=0; seek_loop<seek_array.length; seek_loop++)
	{
		if (seek_loop % 3 == 0) open_current_greek.push(seek_array[seek_loop]);
		else if (seek_loop % 3 == 1) open_current_strongs.push(parseInt(seek_array[seek_loop]));
		else open_current_parsing.push(seek_array[seek_loop]);
	}

	for (var seek_loop=0; seek_loop<open_english_array.length; seek_loop++)
	{
		if (open_english_array[seek_loop].indexOf("$ " + open_current_book + ":" + open_current_chapter + ":" + open_current_verse) != -1)
		{
			open_current_english = open_english_array[seek_loop].split(" ").slice(2);			
	
			break; // leave loop
		}
	}

	// convert latinized greek to polytonic

	open_current_polytonic = [];

	for (var seek_loop=0; seek_loop<open_current_greek.length; seek_loop++)
	{
		open_current_polytonic[seek_loop] = open_current_greek[seek_loop] + " ";

		if (open_options_greek_polytonic == "yes")
		{
			for (var char_loop=0; char_loop<open_greek_polytonic_html_replacement.length; char_loop+=2)
			{
				while (open_current_polytonic[seek_loop].indexOf(open_greek_polytonic_html_replacement[char_loop]) != -1)
				{	
					open_current_polytonic[seek_loop] = open_current_polytonic[seek_loop].replace(open_greek_polytonic_html_replacement[char_loop],
						open_greek_polytonic_html_replacement[char_loop+1]);
				}
			}
		}
		else if (open_options_greek_polytonic == "no")
		{
			for (var char_loop=0; char_loop<open_greek_basic_html_replacement.length; char_loop+=2)
			{
				while (open_current_polytonic[seek_loop].indexOf(open_greek_basic_html_replacement[char_loop]) != -1)
				{	
					open_current_polytonic[seek_loop] = open_current_polytonic[seek_loop].replace(open_greek_basic_html_replacement[char_loop],
						open_greek_basic_html_replacement[char_loop+1]);
				}
			}
		}
			
		open_current_polytonic[seek_loop] = open_current_polytonic[seek_loop].replace(" ", "");
	}

	open_current_root = [];

	for (var seek_loop=0; seek_loop<open_current_polytonic.length; seek_loop++)
	{
		open_current_root[seek_loop] = open_greek_roots_array[open_current_strongs[seek_loop]] + " ";

		if (open_options_greek_polytonic == "yes")
		{
			for (var char_loop=0; char_loop<open_greek_polytonic_html_replacement.length; char_loop+=2)
			{
				while (open_current_root[seek_loop].indexOf(open_greek_polytonic_html_replacement[char_loop]) != -1)
				{	
					open_current_root[seek_loop] = open_current_root[seek_loop].replace(open_greek_polytonic_html_replacement[char_loop],
						open_greek_polytonic_html_replacement[char_loop+1]);
				}
			}
		}
		else if (open_options_greek_polytonic == "no")
		{
			for (var char_loop=0; char_loop<open_greek_basic_html_replacement.length; char_loop+=2)
			{
				while (open_current_root[seek_loop].indexOf(open_greek_basic_html_replacement[char_loop]) != -1)
				{	
					open_current_root[seek_loop] = open_current_root[seek_loop].replace(open_greek_basic_html_replacement[char_loop],
						open_greek_basic_html_replacement[char_loop+1]);
				}
			}
		}

		open_current_root[seek_loop] = open_current_root[seek_loop].replace(" ", "");
	}

	open_current_transliteration = [];

	for (var seek_loop=0; seek_loop<open_current_greek.length; seek_loop++)
	{
		open_current_transliteration[seek_loop] = "";

		for (var trans_loop=0; trans_loop<open_current_greek[seek_loop].length; trans_loop++)
		{
			switch (open_current_greek[seek_loop].charAt(trans_loop).toUpperCase())
			{
				case "A": { open_current_transliteration[seek_loop] += "A"; break; }
				case "B": { open_current_transliteration[seek_loop] += "B"; break; }
				case "G": { open_current_transliteration[seek_loop] += "G"; break; }
				case "D": { open_current_transliteration[seek_loop] += "D"; break; }
				case "E": { open_current_transliteration[seek_loop] += "E"; break; }
				case "Z": { open_current_transliteration[seek_loop] += "Z"; break; }
				case "H": { open_current_transliteration[seek_loop] += "&#274;"; break; }
				case "J": { open_current_transliteration[seek_loop] += "TH"; break; }
				case "I": { open_current_transliteration[seek_loop] += "I"; break; }
				case "K": { open_current_transliteration[seek_loop] += "K"; break; }
				case "L": { open_current_transliteration[seek_loop] += "L"; break; }
				case "M": { open_current_transliteration[seek_loop] += "M"; break; }
				case "N": { open_current_transliteration[seek_loop] += "N"; break; }
				case "X": { open_current_transliteration[seek_loop] += "X"; break; }
				case "O": { open_current_transliteration[seek_loop] += "O"; break; }
				case "P": { open_current_transliteration[seek_loop] += "P"; break; }
				case "R": { open_current_transliteration[seek_loop] += "R"; break; }
				case "S": { open_current_transliteration[seek_loop] += "S"; break; }
				case "T": { open_current_transliteration[seek_loop] += "T"; break; }
				case "U": { open_current_transliteration[seek_loop] += "U"; break; }
				case "F": { open_current_transliteration[seek_loop] += "PH"; break; }
				case "Q": { open_current_transliteration[seek_loop] += "CH"; break; }
				case "Y": { open_current_transliteration[seek_loop] += "PS"; break; }
				case "W": { open_current_transliteration[seek_loop] += "&#332;"; break; }
				default: { }
			}
		}

		for (var trans_loop=0; trans_loop<open_current_greek[seek_loop].length; trans_loop++)
		{
			if (open_current_greek[seek_loop].charAt(trans_loop) == "<")
			{
				open_current_transliteration[seek_loop] = "H" + open_current_transliteration[seek_loop];
			}
		}
	}

	if (open_current_verse == 1)
	{
		elem = document.createElement("span");
		elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
		document.getElementById("main_div").appendChild(elem);
	}
	else if (open_current_greek[0] == "%")
	{
		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("span");
		elem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
		document.getElementById("main_div").appendChild(elem);
	}

	elem = document.createElement("span");
	elem.innerHTML = " ";
	document.getElementById("main_div").appendChild(elem);

	parent = document.createElement("div");
	parent.style.display = "inline";
	parent.style.whiteSpace = "nowrap";
	document.getElementById("main_div").appendChild(parent);

	elem = document.createElement("table");
	elem.id = "v" + open_current_verse;
	elem.setAttribute("class", "english_verse");
	elem.setAttribute("data-english", "<b>" + open_current_verse + "</b> " + open_current_english.join(" "));
	elem.style.display = "inline-block";
	elem.style.fontSize = open_options_greek_font + "px";
	elem.style.color = open_options_text_color;
	elem.innerHTML = "<tr><td style='font-size:" + open_options_greek_font + ";'><b>" + 
		open_current_verse + "&nbsp;</b></td></tr><tr><td style='font-size:" + open_options_gloss_font + ";'>&nbsp;</td></tr>";
	parent.appendChild(elem);

	verse_flag = true;
	
	for (var seek_loop=0; seek_loop<open_current_polytonic.length; seek_loop++)
	{
		if (open_gloss_view_array[parseInt(open_current_strongs[seek_loop])] == "show" &&
			parseInt(open_current_strongs[seek_loop]) != 0) // &&
			//parseInt(open_greek_count_array[parseInt(open_current_strongs[seek_loop])]) <= open_options_gloss_count)
		{
			if (verse_flag == true)
			{
				verse_flag = false;
			}
			else
			{
				elem = document.createElement("span");
				elem.innerHTML = " ";
				document.getElementById("main_div").appendChild(elem);

				parent = document.createElement("div");
				parent.style.display = "inline";
				parent.style.whiteSpace = "nowrap";
				document.getElementById("main_div").appendChild(parent);
			}

			elem = document.createElement("table");
			elem.setAttribute("class", "greek_word");
			if (open_gloss_trans_array[parseInt(open_current_strongs[seek_loop])] == "")
			{
				elem.setAttribute("data-gloss", open_greek_translations_array[parseInt(open_current_strongs[seek_loop])].split(" ; ")[0]);
			}
			else
			{
				elem.setAttribute("data-gloss", open_gloss_trans_array[parseInt(open_current_strongs[seek_loop])]);
			}
			elem.setAttribute("data-greek", "<b>" + open_current_polytonic[seek_loop] + "</b><br>" +
				(open_current_transliteration == "" ? "" : open_current_transliteration[seek_loop] + "<br>") +
				(open_current_root[seek_loop] == "" ? "" : "Root: " + open_current_root[seek_loop] + "<br>") +
				(open_current_parsing[seek_loop] == "{}" ? "" : "Parsing: " + open_current_parsing[seek_loop] + "<br>") +
				(open_current_strongs[seek_loop] == "0" ? "" : "Strongs: " + open_current_strongs[seek_loop] + "<br>") +
				(elem.getAttribute("data-gloss") == "" ? "" : "<b>\"" + elem.getAttribute("data-gloss") + "\"</b><br>") + 
				open_greek_translations_array[open_current_strongs[seek_loop]]);
			elem.setAttribute("data-strongs", open_current_strongs[seek_loop] + "");
			elem.style.display = "inline-block";
			parent.appendChild(elem);

			temp_row = document.createElement("tr");
			elem.appendChild(temp_row);

			temp_cell = document.createElement("td");
			temp_cell.style.color = open_options_text_color;
			temp_cell.style.fontSize = open_options_greek_font + "px";
			temp_cell.innerHTML = open_current_polytonic[seek_loop];
			temp_row.appendChild(temp_cell);

			temp_row = document.createElement("tr");
			elem.appendChild(temp_row);

			temp_cell = document.createElement("td");
			temp_cell.style.color = open_options_text_color;
			temp_cell.style.fontSize = open_options_gloss_font + "px";
			temp_cell.innerHTML = elem.getAttribute("data-gloss");
			temp_row.appendChild(temp_cell);
		}
		else
		{
			if (!(open_current_greek[seek_loop] == "." || open_current_greek[seek_loop] == "," ||
				open_current_greek[seek_loop] == ":" || open_current_greek[seek_loop] == ";" ||
				(open_current_greek[seek_loop] == "%" && verse_flag == true)))
			{
				if (verse_flag == true)
				{
					verse_flag = false;
				}
				else
				{
					elem = document.createElement("span");
					elem.innerHTML = " ";
					document.getElementById("main_div").appendChild(elem);

					parent = document.createElement("div");
					parent.style.display = "inline";
					parent.style.whiteSpace = "nowrap";
					document.getElementById("main_div").appendChild(parent);
				}
			}

			elem = document.createElement("table");
			elem.setAttribute("class", "greek_word");
			if (open_gloss_trans_array[parseInt(open_current_strongs[seek_loop])] == "")
			{
				elem.setAttribute("data-gloss", (parseInt(open_current_strongs[seek_loop]) >= 0 && parseInt(open_current_strongs[seek_loop]) <= 5625 ?
					open_greek_translations_array[parseInt(open_current_strongs[seek_loop])].split(" ; ")[0] : ""));
			}
			else
			{
				elem.setAttribute("data-gloss", (parseInt(open_current_strongs[seek_loop]) >= 0 && parseInt(open_current_strongs[seek_loop]) <= 5625 ?
					open_gloss_trans_array[parseInt(open_current_strongs[seek_loop])] : ""));
			}
			elem.setAttribute("data-greek", "<b>" + open_current_polytonic[seek_loop] + "</b><br>" +
				(open_current_transliteration == "" ? "" : open_current_transliteration[seek_loop] + "<br>") +
				(open_current_root[seek_loop] == "" ? "" : "Root: " + open_current_root[seek_loop] + "<br>") +
				(open_current_parsing[seek_loop] == "{}" ? "" : "Parsing: " + open_current_parsing[seek_loop] + "<br>") +
				(open_current_strongs[seek_loop] == "0" ? "" : "Strongs: " + open_current_strongs[seek_loop] + "<br>") +
				(elem.getAttribute("data-gloss") == "" ? "" : "<b>\"" + elem.getAttribute("data-gloss") + "\"</b><br>") + 
				open_greek_translations_array[open_current_strongs[seek_loop]]);
			elem.setAttribute("data-strongs", open_current_strongs[seek_loop] + "");
			elem.style.display = "inline-block";
			parent.appendChild(elem);
			
			temp_row = document.createElement("tr");
			elem.appendChild(temp_row);

			temp_cell = document.createElement("td");
			temp_cell.style.color = open_options_text_color;
			temp_cell.style.fontSize = open_options_greek_font + "px";
			temp_cell.innerHTML = (parseInt(open_current_strongs[seek_loop]) == 0 ? "<i>" : "") +
				open_current_polytonic[seek_loop] + (parseInt(open_current_strongs[seek_loop]) == 0 ? "</i>" : "");
			temp_row.appendChild(temp_cell);

			temp_row = document.createElement("tr");
			elem.appendChild(temp_row);

			temp_cell = document.createElement("td");
			temp_cell.style.color = open_options_text_color;
			temp_cell.style.fontSize = open_options_gloss_font + "px";
			temp_cell.innerHTML = "&nbsp;";
			temp_row.appendChild(temp_cell);			
		}
	}

	elem = document.createElement("span");
	elem.innerHTML = "&nbsp;";
	document.getElementById("main_div").appendChild(elem);

	return true;
};

function Paint()
{
	localStorage.setItem("myLastMode", open_current_mode);
	localStorage.setItem("myLastBook", open_current_book);
	localStorage.setItem("myLastChapter", open_current_chapter);

	document.getElementById("main_div").innerHTML = "";

	document.getElementById("top_chapter_span").innerHTML = "<b>" + open_nt_name_listing[open_current_book] + 
		(open_nt_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
	document.getElementById("bottom_chapter_span").innerHTML = "<b>" + open_nt_name_listing[open_current_book] + 
		(open_nt_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
	
	open_current_verse = 1;

	while (Stroke() == true)
	{
		open_current_verse++;
	}

	document.getElementById("top_div").style.display = "block";
	document.getElementById("bottom_div").style.display = "block";

	document.getElementById("top_prev_button").style.display = "inline";
	document.getElementById("top_next_button").style.display = "inline";

	document.getElementById("switch_select").style.display = "block";
	document.getElementById("switch_option_english").disabled = false;
	document.getElementById("switch_option_hebrew").disabled = "disabled";
	document.getElementById("switch_option_greek").disabled = false;
	document.getElementById("switch_option_latin").disabled = false;
	document.getElementById("switch_select").value = "latin";

	document.getElementById("search_button").style.display = "block";
	document.getElementById("search_button").innerHTML = "Search";

	document.getElementById("top_div").style.fontSize = open_options_menu_font + "px";
	document.getElementById("bottom_div").style.fontSize = open_options_menu_font + "px";

	document.getElementById("main_div").style.color = open_options_text_color;
	document.getElementById("top_div").style.color = open_options_text_color;
	document.getElementById("bottom_div").style.color = open_options_text_color;
	document.getElementById("popup_div").style.color = open_options_text_color;
	document.getElementById("menu_div").style.color = open_options_text_color;

	document.getElementById("main_div").style.backgroundColor = open_options_background_color;
	document.getElementById("top_div").style.backgroundColor = open_options_background_color;
	document.getElementById("bottom_div").style.backgroundColor = open_options_background_color;
	document.getElementById("popup_div").style.backgroundColor = open_options_background_color;
	document.getElementById("menu_div").style.backgroundColor = open_options_background_color;
	
	document.getElementById("loading_div").style.color = open_options_text_color;
	document.getElementById("loading_div").style.backgroundColor = open_options_background_color;

	document.body.style.backgroundColor = open_options_background_color;

	setTimeout(function()
	{
		var list = document.getElementsByClassName("english_verse");

		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function(event)
			{
				if (event.pageX > window.innerWidth - open_options_popup_width - 20)
				{
					document.getElementById("popup_div").style.left = (window.innerWidth - open_options_popup_width - 20) + "px";
				}
				else
				{
					document.getElementById("popup_div").style.left = event.pageX + "px";
				}

				document.getElementById("popup_div").style.top = event.pageY + "px";
				document.getElementById("popup_div").style.width = open_options_popup_width + "px";

				document.getElementById("popup_div").style.fontSize = open_options_popup_font + "px";
				document.getElementById("popup_div").style.color = open_options_text_color;
			
				document.getElementById("popup_div").innerHTML = this.getAttribute("data-english") + "<br>";
	
				var temp_elem = document.createElement("button");
				temp_elem.innerHTML = "Close";
				temp_elem.addEventListener("click", function()
				{
					document.getElementById("popup_div").style.display = "none";
				});
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
		
				document.getElementById("popup_div").style.display = "inline";
			});
		}

		list = document.getElementsByClassName("latin_word");

		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function(event)
			{
				if (event.pageX > window.innerWidth - open_options_popup_width - 20)
				{
					document.getElementById("popup_div").style.left = (window.innerWidth - open_options_popup_width - 20) + "px";
				}
				else
				{
					document.getElementById("popup_div").style.left = event.pageX + "px";
				}
			
				document.getElementById("popup_div").style.top = event.pageY + "px";
				document.getElementById("popup_div").style.width = open_options_popup_width + "px";

				document.getElementById("popup_div").style.fontSize = open_options_popup_font + "px";
				document.getElementById("popup_div").style.color = open_options_text_color;
			
				document.getElementById("popup_div").innerHTML = this.getAttribute("data-latin") + "<br>";
	
				var temp_elem;

				temp_elem = document.createElement("button");
				temp_elem.style.float = "right";
				temp_elem.innerHTML = "Close";
				temp_elem.addEventListener("click", function()
				{
					document.getElementById("popup_div").style.display = "none";
				});
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
		
				document.getElementById("popup_div").style.display = "inline";
			});
		}

		if (open_first_load == true)
		{
			open_first_load = false;

			if (localStorage.getItem("myScrollTop"))
			{
				document.body.scrollTop = localStorage.getItem("myScrollTop");
			}
		}
		else
		{
			var temp_elem = document.createElement("a");
			if (document.location.href.indexOf("#") == -1) temp_elem.href = document.location.href + "#";
			else temp_elem.href = document.location.href;
			temp_elem.style.display = "none";
			document.getElementById("main_div").appendChild(temp_elem);
			temp_elem.click();
		}

	}, 250);

	return;
};

function Stroke()
{
	var elem, parent, temp_row, temp_cell;

	var seek_array = [];

	var seek_flag = false, verse_flag;
	
	var strongs_array;

	var strongs_flag;

	var full_text;

	for (var seek_loop=0; seek_loop<open_latin_array.length; seek_loop++)
	{
		if (open_latin_array[seek_loop].indexOf("$ " + open_current_book + ":" + open_current_chapter + ":" + open_current_verse) != -1)
		{
			seek_array = open_latin_array[seek_loop].split(" ").slice(2);

			seek_array.pop(); // removes last empty space element

			seek_flag = true;
	
			break; // leave loop
		}
	}
	
	if (seek_flag == false) return false;

	open_current_latin = [];
	open_current_strongs = [];

	for (var seek_loop=0; seek_loop<seek_array.length; seek_loop++)
	{
		if (seek_loop % 2 == 0) open_current_latin.push(seek_array[seek_loop]);
		else if (seek_loop % 2 == 1) open_current_strongs.push(seek_array[seek_loop]);
	}

	for (var seek_loop=0; seek_loop<open_english_array.length; seek_loop++)
	{
		if (open_english_array[seek_loop].indexOf("$ " + open_current_book + ":" + open_current_chapter + ":" + open_current_verse) != -1)
		{
			open_current_english = open_english_array[seek_loop].split(" ").slice(2);			
	
			break; // leave loop
		}
	}

	elem = document.createElement("br");
	document.getElementById("main_div").appendChild(elem);

	elem = document.createElement("span");
	elem.innerHTML = " ";
	document.getElementById("main_div").appendChild(elem);

	parent = document.createElement("div");
	parent.style.display = "inline";
	parent.style.whiteSpace = "nowrap";
	document.getElementById("main_div").appendChild(parent);

	elem = document.createElement("table");
	elem.id = "v" + open_current_verse;
	elem.setAttribute("class", "english_verse");
	elem.setAttribute("data-english", "<b>" + open_current_verse + "</b> " + open_current_english.join(" "));
	elem.style.display = "inline-block";
	elem.style.fontSize = open_options_latin_font + "px";
	elem.style.color = open_options_text_color;
	elem.innerHTML = "<tr><td style='font-size:" + open_options_latin_font + ";'><b>" + 
		open_current_verse + "&nbsp;</b></td></tr><tr><td style='font-size:" + open_options_gloss_font + ";'>&nbsp;</td></tr>";
	parent.appendChild(elem);

	verse_flag = true;
	
	for (var seek_loop=0; seek_loop<open_current_latin.length; seek_loop++)
	{
		// convert weird latin characters

		while (open_current_latin[seek_loop].indexOf("'AE") != -1) { 
			open_current_latin[seek_loop] = open_current_latin[seek_loop].replace("'AE", "&#198;"); }
		while (open_current_latin[seek_loop].indexOf("'ae") != -1) { 
			open_current_latin[seek_loop] = open_current_latin[seek_loop].replace("'ae", "&#230;"); }
		while (open_current_latin[seek_loop].indexOf("'OE") != -1) { 
			open_current_latin[seek_loop] = open_current_latin[seek_loop].replace("'OE", "&#338;"); }
		while (open_current_latin[seek_loop].indexOf("'oe") != -1) { 
			open_current_latin[seek_loop] = open_current_latin[seek_loop].replace("'oe", "&#339;"); }
		while (open_current_latin[seek_loop].indexOf("'EE") != -1) { 
			open_current_latin[seek_loop] = open_current_latin[seek_loop].replace("'EE", "&#203;"); }
		while (open_current_latin[seek_loop].indexOf("'ee") != -1) { 
			open_current_latin[seek_loop] = open_current_latin[seek_loop].replace("'ee", "&#235;"); }

		strongs_array = open_current_strongs[seek_loop].split("|");

		strongs_flag = false;

		for (var strongs_loop=0; strongs_loop<strongs_array.length; strongs_loop++)
		{
			if (parseInt(strongs_array[strongs_loop]) != 0)
			{
				for (var id_loop=1; id_loop<=6352; id_loop++)
				{
					if (parseInt(open_latin_id_array[id_loop]) == parseInt(strongs_array[strongs_loop]))
					{
						if (open_latin_count_array[id_loop] <= open_latin_gloss_word_count)
						{
							strongs_flag = true;
						}
					}
				}
			}
		}

		if (verse_flag == true)
		{
			verse_flag = false;
		}
		else
		{
			if (!(open_current_latin[seek_loop] == "." || open_current_latin[seek_loop] == "," ||
				open_current_latin[seek_loop] == ":" || open_current_latin[seek_loop] == ";" ||
				open_current_latin[seek_loop] == "?" || open_current_latin[seek_loop] == "!"))
			{
				elem = document.createElement("span");
				elem.innerHTML = " ";
				document.getElementById("main_div").appendChild(elem);
	
				parent = document.createElement("div");
				parent.style.display = "inline";
				parent.style.whiteSpace = "nowrap";
				document.getElementById("main_div").appendChild(parent);
			}
		}

		full_text = "";

		if (parseInt(strongs_array[0]) != 0)
		{
			for (var strongs_loop=0; strongs_loop<strongs_array.length; strongs_loop++)
			{
				for (var id_loop=1; id_loop<=6352; id_loop++)
				{
					if (parseInt(open_latin_id_array[id_loop]) == parseInt(strongs_array[strongs_loop]))
					{		
						full_text += "<hr>";
	
						full_text += "Root: " + open_latin_roots_array[id_loop] + "<br>" +
							"Def: <i>" + open_latin_translations_array[id_loop] + "</i><br>";
					}
				}
			}
		}	

		elem = document.createElement("table");
		elem.setAttribute("class", "latin_word");
		elem.setAttribute("data-latin", "<b>" + open_current_latin[seek_loop] + "</b><br>" + full_text);
		elem.style.display = "inline-block";

		temp_row = document.createElement("tr");
		elem.appendChild(temp_row);

		temp_cell = document.createElement("td");
		temp_cell.style.color = open_options_text_color;
		temp_cell.style.fontSize = open_options_greek_font + "px";
		temp_cell.innerHTML = open_current_latin[seek_loop];
		temp_row.appendChild(temp_cell);

		temp_row = document.createElement("tr");
		elem.appendChild(temp_row);

		temp_cell = document.createElement("td");
		if (strongs_flag == true)
		{
			temp_cell.innerHTML = "";	

			for (var strongs_loop=0; strongs_loop<strongs_array.length; strongs_loop++)
			{
				if (strongs_loop != 0)
				{
					temp_cell.innerHTML += " | ";
				}

				for (var id_loop=1; id_loop<=6352; id_loop++)
				{
					if (parseInt(open_latin_id_array[id_loop]) == parseInt(strongs_array[strongs_loop]))
					{
						temp_cell.innerHTML += open_latin_translations_array[id_loop].substring(0,
							open_latin_translations_array[id_loop].indexOf(";"));

						if (open_latin_translations_array[id_loop] == "") temp_cell.innerHTML += "*";
					}
				}
			}
		}
		else
		{
			if (parseInt(strongs_array[0]) == 0 && open_latin_gloss_word_count > 0)
			{
				if (open_current_latin[seek_loop] == "." || open_current_latin[seek_loop] == "," ||
					open_current_latin[seek_loop] == ":" || open_current_latin[seek_loop] == ";" ||
					open_current_latin[seek_loop] == "?" || open_current_latin[seek_loop] == "!" ||
					open_current_latin[seek_loop] == "\\" || open_current_latin[seek_loop] == "/" ||
					open_current_latin[seek_loop] == "[" || open_current_latin[seek_loop] == "]" ||
					open_current_latin[seek_loop] == "(" || open_current_latin[seek_loop] == ")")
				{
					temp_cell.innerHTML = "&nbsp;";
				}
				else
				{
					temp_cell.innerHTML = "---";
				}
			}
			else
			{
				temp_cell.innerHTML = "&nbsp;";
			}
		}
		temp_cell.style.color = open_options_text_color;
		temp_cell.style.fontSize = open_options_gloss_font + "px";
		temp_cell.style.maxWidth = parseInt(open_options_popup_width/2) + "px";
		temp_cell.style.overflow = "hidden";
		temp_cell.style.whiteSpace = "nowrap";
		temp_cell.style.textOverflow = "ellipsis";
		temp_row.appendChild(temp_cell);

		parent.appendChild(elem);
	}

	elem = document.createElement("span");
	elem.innerHTML = "&nbsp;";
	document.getElementById("main_div").appendChild(elem);

	return true;
};

function Scribe()
{
	localStorage.setItem("myLastMode", open_current_mode);
	localStorage.setItem("myLastBook", open_current_book);
	localStorage.setItem("myLastChapter", open_current_chapter);

	document.getElementById("main_div").innerHTML = "";

	document.getElementById("top_chapter_span").innerHTML = "<b>" + open_ot_name_listing[open_current_book] + 
		(open_ot_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
	document.getElementById("bottom_chapter_span").innerHTML = "<b>" + open_ot_name_listing[open_current_book] + 
		(open_ot_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
	
	open_current_verse = 1;

	while (Jot() == true)
	{
		open_current_verse++;
	}

	document.getElementById("top_div").style.display = "block";
	document.getElementById("bottom_div").style.display = "block";

	document.getElementById("top_prev_button").style.display = "inline";
	document.getElementById("top_next_button").style.display = "inline";

	document.getElementById("switch_select").style.display = "block";
	document.getElementById("switch_option_english").disabled = false;
	document.getElementById("switch_option_hebrew").disabled = false;
	document.getElementById("switch_option_greek").disabled = "disabled";
	document.getElementById("switch_option_latin").disabled = "disabled";
	document.getElementById("switch_select").value = "hebrew";

	document.getElementById("search_button").style.display = "block";
	document.getElementById("search_button").innerHTML = "Search";

	document.getElementById("top_div").style.fontSize = open_options_menu_font + "px";
	document.getElementById("bottom_div").style.fontSize = open_options_menu_font + "px";

	document.getElementById("main_div").style.color = open_options_text_color;
	document.getElementById("top_div").style.color = open_options_text_color;
	document.getElementById("bottom_div").style.color = open_options_text_color;
	document.getElementById("popup_div").style.color = open_options_text_color;
	document.getElementById("menu_div").style.color = open_options_text_color;

	document.getElementById("main_div").style.backgroundColor = open_options_background_color;
	document.getElementById("top_div").style.backgroundColor = open_options_background_color;
	document.getElementById("bottom_div").style.backgroundColor = open_options_background_color;
	document.getElementById("popup_div").style.backgroundColor = open_options_background_color;
	document.getElementById("menu_div").style.backgroundColor = open_options_background_color;

	document.getElementById("loading_div").style.color = open_options_text_color;
	document.getElementById("loading_div").style.backgroundColor = open_options_background_color;

	document.body.style.backgroundColor = open_options_background_color;

	setTimeout(function()
	{
		var list = document.getElementsByClassName("english_verse");

		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function(event)
			{
				if (event.pageX > window.innerWidth - open_options_popup_width - 20)
				{
					document.getElementById("popup_div").style.left = (window.innerWidth - open_options_popup_width - 20) + "px";
				}
				else
				{
					document.getElementById("popup_div").style.left = event.pageX + "px";
				}

				document.getElementById("popup_div").style.top = event.pageY + "px";
				document.getElementById("popup_div").style.width = open_options_popup_width + "px";

				document.getElementById("popup_div").style.fontSize = open_options_popup_font + "px";
				document.getElementById("popup_div").style.color = open_options_text_color;
			
				document.getElementById("popup_div").innerHTML = this.getAttribute("data-english") + "<br>";
	
				var temp_elem = document.createElement("button");
				temp_elem.innerHTML = "Close";
				temp_elem.addEventListener("click", function()
				{
					document.getElementById("popup_div").style.display = "none";
				});
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
		
				document.getElementById("popup_div").style.display = "inline";
			});
		}

		list = document.getElementsByClassName("hebrew_word");

		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function(event)
			{
				if (event.pageX > window.innerWidth - open_options_popup_width - 20)
				{
					document.getElementById("popup_div").style.left = (window.innerWidth - open_options_popup_width - 20) + "px";
				}
				else
				{
					document.getElementById("popup_div").style.left = event.pageX + "px";
				}
			
				document.getElementById("popup_div").style.top = event.pageY + "px";
				document.getElementById("popup_div").style.width = open_options_popup_width + "px";

				document.getElementById("popup_div").style.fontSize = open_options_popup_font + "px";
				document.getElementById("popup_div").style.color = open_options_text_color;
			
				document.getElementById("popup_div").innerHTML = this.getAttribute("data-hebrew") + "<br>";
	
				var temp_elem;

				temp_elem = document.createElement("button");
				temp_elem.style.float = "right";
				temp_elem.innerHTML = "Close";
				temp_elem.addEventListener("click", function()
				{
					document.getElementById("popup_div").style.display = "none";
				});
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
		
				document.getElementById("popup_div").style.display = "inline";
			});
		}

		if (open_first_load == true)
		{
			open_first_load = false;

			if (localStorage.getItem("myScrollTop"))
			{
				document.body.scrollTop = localStorage.getItem("myScrollTop");
			}
		}
		else
		{
			var temp_elem = document.createElement("a");
			if (document.location.href.indexOf("#") == -1) temp_elem.href = document.location.href + "#";
			else temp_elem.href = document.location.href;
			temp_elem.style.display = "none";
			document.getElementById("main_div").appendChild(temp_elem);
			temp_elem.click();
		}

	}, 250);

	return;
};

function Jot()
{
	var seek_flag = false;

	for (var seek_loop=0; seek_loop<open_hebrew_array.length; seek_loop++)
	{
		if (open_hebrew_array[seek_loop].indexOf("$ " + open_current_book + ":" + open_current_chapter + ":" + open_current_verse) != -1)
		{
			open_current_hebrew = open_hebrew_array[seek_loop].split(" ").slice(2);			

			if (open_current_hebrew[open_current_hebrew.length-1] == "") open_current_hebrew.pop();

			seek_flag = true;

			break; // leave loop
		}
	}
	
	if (seek_flag == false) return false;

	for (var seek_loop=0; seek_loop<open_english_array.length; seek_loop++)
	{
		if (open_english_array[seek_loop].indexOf("$ " + open_current_book + ":" + open_current_chapter + ":" + open_current_verse) != -1)
		{
			open_current_english = open_english_array[seek_loop].split(" ").slice(2);			
	
			break; // leave loop
		}
	}

	// convert to hebrew text (using the polytonic array)

	open_current_polytonic = [];

	for (var seek_loop=0; seek_loop<open_current_hebrew.length; seek_loop++)
	{
		open_current_polytonic[seek_loop] = open_current_hebrew[seek_loop] + " ";

		for (var char_loop=0; char_loop<open_hebrew_html_replacement.length; char_loop+=2)
		{
			while (open_current_polytonic[seek_loop].indexOf(open_hebrew_html_replacement[char_loop]) != -1)
			{
				open_current_polytonic[seek_loop] = open_current_polytonic[seek_loop].
					replace(open_hebrew_html_replacement[char_loop], open_hebrew_html_replacement[char_loop+1]);
			}
		}

		open_current_polytonic[seek_loop] = open_current_polytonic[seek_loop].replace(" ", "");
	}

	open_current_transliteration = [];
	
	for (var seek_loop=0; seek_loop<open_current_hebrew.length; seek_loop++)
	{
		open_current_transliteration[seek_loop] = open_current_hebrew[seek_loop] + " ";

		for (var char_loop=0; char_loop<open_current_transliteration[seek_loop].length; char_loop++)
		{
			if (open_current_transliteration[seek_loop].charAt(char_loop) == "c")
			{
				open_current_transliteration[seek_loop] = open_current_transliteration[seek_loop].substring(0, char_loop) +
					"ch" + open_current_transliteration[seek_loop].substring(char_loop+1, open_current_transliteration[seek_loop].length);

				char_loop++;
			}
			else if (open_current_transliteration[seek_loop].charAt(char_loop) == "j")
			{
				open_current_transliteration[seek_loop] = open_current_transliteration[seek_loop].substring(0, char_loop) +
					"tz" + open_current_transliteration[seek_loop].substring(char_loop+1, open_current_transliteration[seek_loop].length);

				char_loop++;
			}
			else if (open_current_transliteration[seek_loop].charAt(char_loop) == "J")
			{
				open_current_transliteration[seek_loop] = open_current_transliteration[seek_loop].substring(0, char_loop) +
					"TZ" + open_current_transliteration[seek_loop].substring(char_loop+1, open_current_transliteration[seek_loop].length);

				char_loop++;
			}
			else if (open_current_transliteration[seek_loop].charAt(char_loop) == "x")
			{
				open_current_transliteration[seek_loop] = open_current_transliteration[seek_loop].substring(0, char_loop) +
					"sh" + open_current_transliteration[seek_loop].substring(char_loop+1, open_current_transliteration[seek_loop].length);

				char_loop++;
			}
		}

		open_current_transliteration[seek_loop] = open_current_transliteration[seek_loop].replace(" ", "");

		open_current_transliteration[seek_loop] = open_current_transliteration[seek_loop].toUpperCase();
	}

	var elem, parent;
	
	parent = document.createElement("div");
	parent.style.textAlign = "right";
	parent.style.padding = "5px 5px";
	document.getElementById("main_div").appendChild(parent);

	elem = document.createElement("span");
	elem.id = "v" + open_current_verse;
	elem.setAttribute("class", "english_verse");
	elem.setAttribute("data-english", "<b>" + open_current_verse + "</b> " + open_current_english.join(" "));
	elem.style.fontSize = open_options_hebrew_font + "px";
	elem.style.color = open_options_text_color;
	elem.innerHTML = "<b>" + open_current_verse + "</b>";
	parent.appendChild(elem);

	elem = document.createElement("br");
	parent.appendChild(elem);

	for (var seek_loop=0; seek_loop<open_current_hebrew.length; seek_loop++)
	{
		elem = document.createElement("span");
		elem.setAttribute("class", "hebrew_word");
		elem.setAttribute("data-hebrew", "<b>" + open_current_polytonic[seek_loop] + "</b><br>" + 
			open_current_transliteration[seek_loop]); 
		elem.style.fontSize = open_options_hebrew_font + "px";
		elem.style.color = open_options_text_color;
		elem.innerHTML = open_current_polytonic[seek_loop] + " ";
		parent.appendChild(elem);
	}

	elem = document.createElement("br");
	parent.appendChild(elem);

	elem = document.createElement("br");
	parent.appendChild(elem);

	return true;
};

function Print()
{
	localStorage.setItem("myLastMode", open_current_mode);
	localStorage.setItem("myLastBook", open_current_book);
	localStorage.setItem("myLastChapter", open_current_chapter);

	document.getElementById("main_div").innerHTML = "";

	if (open_current_mode == "english_nt")
	{
		document.getElementById("top_chapter_span").innerHTML = "<b>" + open_nt_name_listing[open_current_book] + 
			(open_nt_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
		document.getElementById("bottom_chapter_span").innerHTML = "<b>" + open_nt_name_listing[open_current_book] + 
			(open_nt_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
	}
	else if (open_current_mode == "english_ot")
	{
		document.getElementById("top_chapter_span").innerHTML = "<b>" + open_ot_name_listing[open_current_book] + 
			(open_ot_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
		document.getElementById("bottom_chapter_span").innerHTML = "<b>" + open_ot_name_listing[open_current_book] + 
			(open_ot_range_listing[open_current_book] > 1 ? " " + open_current_chapter : "") + "</b>";
	}
	
	open_current_verse = 1;

	while (Grab() == true)
	{
		open_current_verse++;
	}

	document.getElementById("top_div").style.display = "block";
	document.getElementById("bottom_div").style.display = "block";

	document.getElementById("top_prev_button").style.display = "inline";
	document.getElementById("top_next_button").style.display = "inline";

	if (open_current_mode == "english_ot")
	{
		document.getElementById("switch_select").style.display = "block";
		document.getElementById("switch_option_english").disabled = false;
		document.getElementById("switch_option_hebrew").disabled = false;
		document.getElementById("switch_option_greek").disabled = "disabled";
		document.getElementById("switch_option_latin").disabled = "disabled";
		document.getElementById("switch_select").value = "english";
	}
	else if (open_current_mode == "english_nt")
	{
		document.getElementById("switch_select").style.display = "block";
		document.getElementById("switch_option_english").disabled = false;
		document.getElementById("switch_option_hebrew").disabled = "disabled";
		document.getElementById("switch_option_greek").disabled = false;
		document.getElementById("switch_option_latin").disabled = false;
		document.getElementById("switch_select").value = "english";
	}

	document.getElementById("search_button").style.display = "block";
	document.getElementById("search_button").innerHTML = "Search";

	document.getElementById("top_div").style.fontSize = open_options_menu_font + "px";
	document.getElementById("bottom_div").style.fontSize = open_options_menu_font + "px";

	document.getElementById("main_div").style.color = open_options_text_color;
	document.getElementById("top_div").style.color = open_options_text_color;
	document.getElementById("bottom_div").style.color = open_options_text_color;
	document.getElementById("popup_div").style.color = open_options_text_color;
	document.getElementById("menu_div").style.color = open_options_text_color;

	document.getElementById("main_div").style.backgroundColor = open_options_background_color;
	document.getElementById("top_div").style.backgroundColor = open_options_background_color;
	document.getElementById("bottom_div").style.backgroundColor = open_options_background_color;
	document.getElementById("popup_div").style.backgroundColor = open_options_background_color;
	document.getElementById("menu_div").style.backgroundColor = open_options_background_color;

	document.getElementById("loading_div").style.color = open_options_text_color;
	document.getElementById("loading_div").style.backgroundColor = open_options_background_color;

	document.body.style.backgroundColor = open_options_background_color;

	setTimeout(function()
	{
		var list = document.getElementsByClassName("english_verse");

		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function(event)
			{
				if (event.pageX > window.innerWidth - open_options_popup_width - 20)
				{
					document.getElementById("popup_div").style.left = (window.innerWidth - open_options_popup_width - 20) + "px";
				}
				else
				{
					document.getElementById("popup_div").style.left = event.pageX + "px";
				}

				document.getElementById("popup_div").style.top = event.pageY + "px";
				document.getElementById("popup_div").style.width = open_options_popup_width + "px";

				document.getElementById("popup_div").style.fontSize = open_options_popup_font + "px";
				document.getElementById("popup_div").style.color = open_options_text_color;
			
				document.getElementById("popup_div").innerHTML = "Select, then Copy<br>";

				var temp_elem = document.createElement("input");
				temp_elem.id = "popup_copy_input";
				temp_elem.type = "text";
				temp_elem.style.height = "20px";
				temp_elem.style.width = (open_options_popup_width - 10) + "px";
				if (open_current_mode == "english_ot") temp_elem.value = open_ot_name_listing[open_current_book];
				else if (open_current_mode == "english_nt") temp_elem.value = open_nt_name_listing[open_current_book];
				temp_elem.value += " " + open_current_chapter + ":" + this.getAttribute("data-number") + " - " + this.getAttribute("data-copy") + "\n";
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
		
				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
	
				temp_elem = document.createElement("button");
				temp_elem.style.float = "left";
				temp_elem.innerHTML = "Select";
				temp_elem.addEventListener("click", function()
				{
					document.getElementById("popup_copy_input").select();
				});
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("button");
				temp_elem.style.float = "right";
				temp_elem.innerHTML = "Close";
				temp_elem.addEventListener("click", function()
				{
					document.getElementById("popup_div").style.display = "none";
				});
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
		
				document.getElementById("popup_div").style.display = "inline";
			});
		}

		list = document.getElementsByClassName("full_verse");

		for (var list_loop=0; list_loop<list.length; list_loop++)
		{
			list[list_loop].addEventListener("click", function(event)
			{
				if (event.pageX > window.innerWidth - open_options_popup_width - 20)
				{
					document.getElementById("popup_div").style.left = (window.innerWidth - open_options_popup_width - 20) + "px";
				}
				else
				{
					document.getElementById("popup_div").style.left = event.pageX + "px";
				}

				document.getElementById("popup_div").style.top = event.pageY + "px";
				document.getElementById("popup_div").style.width = open_options_popup_width + "px";

				document.getElementById("popup_div").style.fontSize = open_options_popup_font + "px";
				document.getElementById("popup_div").style.color = open_options_text_color;
			
				document.getElementById("popup_div").innerHTML = this.getAttribute("data-web") + "<br>";
	
				var temp_elem = document.createElement("button");
				temp_elem.innerHTML = "Close";
				temp_elem.addEventListener("click", function()
				{
					document.getElementById("popup_div").style.display = "none";
				});
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);

				temp_elem = document.createElement("br");
				document.getElementById("popup_div").appendChild(temp_elem);
		
				document.getElementById("popup_div").style.display = "inline";
			});
		}

		if (open_first_load == true)
		{
			open_first_load = false;

			if (localStorage.getItem("myScrollTop"))
			{
				document.body.scrollTop = localStorage.getItem("myScrollTop");
			}
		}
		else
		{
			var temp_elem = document.createElement("a");
			if (document.location.href.indexOf("#") == -1) temp_elem.href = document.location.href + "#";
			else temp_elem.href = document.location.href;
			temp_elem.style.display = "none";
			document.getElementById("main_div").appendChild(temp_elem);
			temp_elem.click();
		}

	}, 250);

	return;
};

function Grab()
{
	var seek_flag = false;

	for (var seek_loop=0; seek_loop<open_english_array.length; seek_loop++)
	{
		if (open_english_array[seek_loop].indexOf("$ " + open_current_book + ":" + open_current_chapter + ":" + open_current_verse) != -1)
		{
			open_current_english = open_english_array[seek_loop].split(" ").slice(2);			
	
			seek_flag = true;

			break; // leave loop
		}
	}

	if (seek_flag == false) return false;	

	for (var seek_loop=0; seek_loop<open_web_array.length; seek_loop++)
	{
		if (open_web_array[seek_loop].indexOf("$ " + open_current_book + ":" + open_current_chapter + ":" + open_current_verse) != -1)
		{
			open_current_web = open_web_array[seek_loop].split(" ").slice(2);			
	
			seek_flag = true;

			break; // leave loop
		}
	}
	
	if (seek_flag == false) return false;	

	var elem = document.createElement("span");
	elem.id = "v" + open_current_verse;
	elem.setAttribute("class", "english_verse");
	elem.setAttribute("data-number", open_current_verse + "");
	elem.setAttribute("data-copy", open_current_english.join(" "));
	elem.style.fontSize = open_options_english_font + "px";
	elem.style.color = open_options_text_color;
	elem.innerHTML = "<b>" + open_current_verse + "</b>&nbsp;&nbsp;";
	document.getElementById("main_div").appendChild(elem);
	
	elem = document.createElement("span");
	elem.setAttribute("class", "full_verse");
	elem.setAttribute("data-web", "<b>" + open_current_verse + "</b> " + open_current_web.join(" ") + " &nbsp;&nbsp;[WEB]");
	elem.style.fontSize = open_options_english_font + "px";
	elem.style.color = open_options_text_color;
	elem.innerHTML = open_current_english.join(" ") + "<br><br>";
	document.getElementById("main_div").appendChild(elem);

	return true;
};

function Display()
{
	if (open_current_mode == "greek_tools" && open_current_book == 0)
	{
		document.getElementById("top_chapter_span").innerHTML = "<b>Greek Search</b>";

		document.getElementById("main_div").innerHTML = "";
		
		var parent, elem, select_elem;

		parent = document.createElement("div");
		parent.style.textAlign = "center";
		document.getElementById("main_div").appendChild(parent);

		select_elem = document.createElement("select");
		select_elem.id = "search_text_select";
		parent.appendChild(select_elem);

		elem = document.createElement("option");
		elem.value = "exact";
		elem.innerHTML = "Exact Phrase";
		select_elem.appendChild(elem);

		elem = document.createElement("option");
		elem.value = "contains";
		elem.innerHTML = "Contains Words";
		select_elem.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("input");
		elem.type = "text";
		elem.id = "search_text_input";
		elem.value = "";
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("div");
		elem.id = "search_text_polytonic_div";
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_greek_font + "px";
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);
		
		elem = document.createElement("button");
		elem.id = "search_text_button";
		elem.innerHTML = "Search";
		elem.addEventListener("click", function()
		{
			var temp_count = 0;

			document.getElementById("message_label").innerHTML = "Searching...";

			document.getElementById("search_text_select").disabled = "disabled";
			document.getElementById("search_text_input").disabled = "disabled";
			document.getElementById("search_text_button").disabled = "disabled";

			document.getElementById("find_div").innerHTML = "";

			open_external_stage = 0;

			clearInterval(open_external_loop_interval);
			
			open_external_loop_interval = setInterval(function()
			{
				if (open_external_stage % 2 == 0)
				{
					open_external_string.value = "";

					var request = new XMLHttpRequest();

					var url_string = "";

					url_string = "Data/" + open_nt_name_listing[parseInt(open_external_stage/2)].
						replace(" ", "").replace(" ", "") + "Greek.txt";
		
					request.onreadystatechange = function()
					{
						if (request.readyState == 4 && request.status == 200)
						{
							open_external_string.value = request.responseText;
						}
					}
	
					request.open("GET", url_string, true);
					request.overrideMimeType("text/plain");
					request.setRequestHeader("Content-Type", "application/json");
					request.send();
	
					open_external_stage++;

					clearInterval(open_external_inner_interval);
		
					open_external_inner_interval = setInterval(function()
					{
						if (open_external_string.value != "")
						{
							clearInterval(open_external_inner_interval);

							open_greek_array = open_external_string.value.split("\n\n");

							var seek_array = [];	

							open_current_greek = [];
							open_current_transliteration = [];
							open_current_polytonic = [];

							for (var full_loop=0; full_loop<open_greek_array.length; full_loop++)
							{
								open_current_greek[full_loop] = "";

								seek_array = open_greek_array[full_loop].split(" ").slice(2);
	
								for (var seek_loop=0; seek_loop<seek_array.length; seek_loop+=3)
								{
									open_current_greek[full_loop] += seek_array[seek_loop] + "  ";
								}

								open_current_transliteration[full_loop] = open_current_greek[full_loop] + "";

								for (var trans_loop=0; trans_loop<open_current_transliteration[full_loop].length; trans_loop++)
								{
									if (!((open_current_transliteration[full_loop].charAt(trans_loop) >= "A" &&
										open_current_transliteration[full_loop].charAt(trans_loop) <= "Z") ||
										(open_current_transliteration[full_loop].charAt(trans_loop) >= "a" &&
										open_current_transliteration[full_loop].charAt(trans_loop) <= "z") ||
										open_current_transliteration[full_loop].charAt(trans_loop) == " "))
									{
										open_current_transliteration[full_loop] = 
											open_current_transliteration[full_loop].substring(0, trans_loop) +
											open_current_transliteration[full_loop].substring(trans_loop+1,
												open_current_transliteration[full_loop].length);

										trans_loop--;
									}
								}

								while (open_current_transliteration[full_loop].indexOf("  ") != -1)
								{
									open_current_transliteration[full_loop] = open_current_transliteration[full_loop].replace("  ", " ");
								}

								open_current_polytonic[full_loop] = open_current_greek[full_loop] + "";
							
								if (open_options_greek_polytonic == "yes")
								{
									for (var char_loop=0; char_loop<open_greek_polytonic_html_replacement.length; char_loop+=2)
									{
										while (open_current_polytonic[full_loop].indexOf(open_greek_polytonic_html_replacement[char_loop]) != -1)
										{
											open_current_polytonic[full_loop] = open_current_polytonic[full_loop].
												replace(open_greek_polytonic_html_replacement[char_loop],
												open_greek_polytonic_html_replacement[char_loop+1]);
										}
									}
								}
								else if (open_options_greek_polytonic == "no")
								{
									for (var char_loop=0; char_loop<open_greek_basic_html_replacement.length; char_loop+=2)
									{
										while (open_current_polytonic[full_loop].indexOf(open_greek_basic_html_replacement[char_loop]) != -1)
										{
											open_current_polytonic[full_loop] = open_current_polytonic[full_loop].
												replace(open_greek_basic_html_replacement[char_loop],
												open_greek_basic_html_replacement[char_loop+1]);
										}
									}
								}

								while (open_current_polytonic[full_loop].indexOf("  ") != -1)
								{
									open_current_polytonic[full_loop] = open_current_polytonic[full_loop].replace("  ", " ");
								}
							}

							open_external_string.value = "";

							clearInterval(open_external_inner_interval);

							var temp_flag, temp_elem, temp_array, temp_inner_tally;

							for (var find_loop=0; find_loop<open_greek_array.length; find_loop++)
							{
								temp_flag = false;

								if (document.getElementById("search_text_select").value == "exact")
								{
									if (open_current_transliteration[find_loop].toUpperCase().indexOf(
										document.getElementById("search_text_input").value.toUpperCase()) != -1)
									{
										temp_flag = true;
									}
								}
								else if (document.getElementById("search_text_select").value == "contains")
								{
									temp_array = document.getElementById("search_text_input").value.split(" ");

									temp_inner_tally = 0;

									for (var inner_loop=0; inner_loop<temp_array.length; inner_loop++)
									{
										if (open_current_transliteration[find_loop].toUpperCase().indexOf(
											temp_array[inner_loop].toUpperCase()) != -1)
										{
											temp_inner_tally++;
										}
									}

									if (temp_inner_tally == temp_array.length)
									{
										temp_flag = true;
									}
								}

								if (temp_flag == true)
								{
									temp_count++;

									temp_elem = document.createElement("a");
									temp_elem.setAttribute("data-mode", "greek");
									temp_elem.setAttribute("data-location", open_greek_array[find_loop].split(" ")[1]);
									temp_elem.href = "#v" + temp_elem.getAttribute("data-location").split(":")[2];
									temp_elem.style.color = open_options_text_color;
									temp_elem.style.fontSize = open_options_greek_font + "px";
									temp_elem.innerHTML = open_nt_name_listing[
										parseInt(temp_elem.getAttribute("data-location").split(":")[0])] + " " +
										temp_elem.getAttribute("data-location").split(":")[1] + ":" + 
										temp_elem.getAttribute("data-location").split(":")[2];

									temp_elem.addEventListener("click", function()
									{
										localStorage.setItem("myMode", this.getAttribute("data-mode"));
										localStorage.setItem("myBook", this.getAttribute("data-location").split(":")[0]);
										localStorage.setItem("myChapter", this.getAttribute("data-location").split(":")[1]);
						
										document.getElementById("loading_div").style.display = "block";

										document.getElementById("top_div").style.display = "none";

										document.getElementById("main_div").innerHTML = "";
	
										Initialize();
									});
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("span");
									temp_elem.style.color = open_options_text_color;
									temp_elem.style.fontSize = open_options_greek_font + "px";
									temp_elem.innerHTML = "&nbsp;&nbsp;" + open_current_polytonic[find_loop];
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("br");
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("br");
									document.getElementById("find_div").appendChild(temp_elem);
								}
							}

							open_external_stage++;

							if (open_external_stage == 2 * open_nt_name_listing.length)
							{
								clearInterval(open_external_loop_interval);

								document.getElementById("message_label").innerHTML = "Found " + temp_count + " Results";

								document.getElementById("search_text_select").disabled = false;
								document.getElementById("search_text_input").disabled = false;
								document.getElementById("search_text_button").disabled = false;

								temp_elem = document.createElement("span");
								temp_elem.style.fontSize = open_options_greek_font + "px";
								temp_elem.innerHTML = "Search Complete";
								document.getElementById("find_div").appendChild(temp_elem);
							}
						}
					}, 100);
				}
			}, 100);
		});
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("a");
		elem.href = "#";
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_greek_font + "px";
		elem.innerHTML = "Click for Greek Letters";
		elem.addEventListener("click", function()
		{
			if (document.getElementById("greek_help_table").style.display == "none")
			{
				document.getElementById("greek_help_table").style.display = "inline-block";
			}
			else
			{
				document.getElementById("greek_help_table").style.display = "none";
			}
		});
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("table");
		elem.id = "greek_help_table";
		elem.style.display = "table";
		elem.style.tableLayout = "fixed";
		elem.style.width = "100%";
		elem.style.maxWidth = "400px";
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_greek_font + "px";
		elem.style.display = "none";

		var temp_row, temp_cell, temp_button;

		temp_row = document.createElement("tr");
		temp_row.style.display = "table";
		temp_row.style.width = "100%";
		elem.appendChild(temp_row);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "A&nbsp;<br>&alpha;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "a"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "B&nbsp;<br>&beta;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "b"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "G&nbsp;<br>&gamma;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "g"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "D&nbsp;<br>&delta;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "d"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "E&nbsp;<br>&epsilon;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "e"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "Z&nbsp;<br>&zeta;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "z"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "H&nbsp;<br>&eta;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "h"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "J&nbsp;<br>&theta;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "j"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "I&nbsp;<br>&iota;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "i"; });
		temp_cell.appendChild(temp_button);

		temp_row = document.createElement("tr");
		temp_row.style.display = "table";
		temp_row.style.width = "100%";
		elem.appendChild(temp_row);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "K&nbsp;<br>&kappa;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "k"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "L&nbsp;<br>&lambda;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "l"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "M&nbsp;<br>&mu;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "m"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "N&nbsp;<br>&nu;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "n"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "X&nbsp;<br>&xi;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "x"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "O&nbsp;<br>&omicron;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "o"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "P&nbsp;<br>&pi;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "p"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "R&nbsp;<br>&rho;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "r"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "S&nbsp;<br>&sigma;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "s"; });
		temp_cell.appendChild(temp_button);

		temp_row = document.createElement("tr");
		temp_row.style.display = "table";
		temp_row.style.width = "100%";
		elem.appendChild(temp_row);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "T&nbsp;<br>&tau;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "t"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "U&nbsp;<br>&upsilon;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "u"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "F&nbsp;<br>&phi;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "f"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "Q&nbsp;<br>&chi;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "q"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "Y&nbsp;<br>&psi;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "y"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "W&nbsp;<br>&omega;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "w"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);

		temp_button = document.createElement("button");
		temp_button.innerHTML = "_&nbsp;<br>_&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += " "; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);

		temp_button = document.createElement("button");
		temp_button.innerHTML = "<&nbsp;<br><&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false)
			document.getElementById("search_text_input").value =
				document.getElementById("search_text_input").value.
					substring(0, document.getElementById("search_text_input").value.length-1); });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.innerHTML = "&nbsp;&nbsp;<br>&nbsp;&nbsp;";
		temp_cell.style.width = "11%";
		temp_cell.style.backgroundColor = open_options_background_color;
		temp_cell.style.color = open_options_text_color;
		temp_cell.style.fontSize = open_options_greek_font + "px";
		temp_row.appendChild(temp_cell);

		parent.appendChild(elem);
		
		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("span");
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_greek_font + "px";
		elem.id = "message_label";
		elem.innerHTML = "";
		parent.appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("div");
		elem.id = "find_div";
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		open_search_text_interval = setInterval(function()
		{	
			var temp_polytonic = document.getElementById("search_text_input").value + "";
		
			if (open_options_greek_polytonic == "yes")
			{
				for (var char_loop=0; char_loop<open_greek_polytonic_html_replacement.length; char_loop+=2)
				{
					while (temp_polytonic.indexOf(open_greek_polytonic_html_replacement[char_loop]) != -1)
					{
						temp_polytonic = temp_polytonic.replace(open_greek_polytonic_html_replacement[char_loop], 
							open_greek_polytonic_html_replacement[char_loop+1]);
					}
				}
			}
			else if (open_options_greek_polytonic == "no")
			{
				for (var char_loop=0; char_loop<open_greek_basic_html_replacement.length; char_loop+=2)
				{
					while (temp_polytonic.indexOf(open_greek_basic_html_replacement[char_loop]) != -1)
					{
						temp_polytonic = temp_polytonic.replace(open_greek_basic_html_replacement[char_loop], 
							open_greek_basic_html_replacement[char_loop+1]);
					}
				}
			}
		
			document.getElementById("search_text_polytonic_div").innerHTML = temp_polytonic;
		}, 250);

		document.getElementById("top_div").style.display = "block";

		document.getElementById("top_prev_button").style.display = "none";
		document.getElementById("top_next_button").style.display = "none";

		document.getElementById("switch_select").style.display = "none";

		document.getElementById("search_button").style.display = "block";
		document.getElementById("search_button").innerHTML = "Go Back";
	}
	else if (open_current_mode == "greek_tools" && open_current_book == 1)
	{
		document.getElementById("top_chapter_span").innerHTML = "<b>Greek Grammar</b>";

		document.getElementById("main_div").innerHTML = "";
		
		open_external_string.value = "";

		var request = new XMLHttpRequest();

		var url_string = "";

		url_string = "Data/GreekGrammar.txt";

		request.onreadystatechange = function()
		{
			if (request.readyState == 4 && request.status == 200)
			{
				open_external_string.value = request.responseText;
			}
		}
	
		request.open("GET", url_string, true);
		request.overrideMimeType("text/plain");
		request.setRequestHeader("Content-Type", "application/json");
		request.send();

		clearInterval(open_external_inner_interval);
		
		open_external_inner_interval = setInterval(function()
		{
			if (open_external_string.value != "")
			{
				clearInterval(open_external_inner_interval);

				var grammar_text = open_external_string.value;

				open_external_string.value = "";

				var elem = document.createElement("div");
				elem.id = "grammar_div";
				elem.style.color = open_options_text_color;
				elem.style.fontSize = open_options_greek_font + "px";
				document.getElementById("main_div").appendChild(elem);

				// change all greek tags to polytonic greek

				var grammar_first_array = grammar_text.split("<greek>");
				var grammar_second_array = [];
		
				for (var greek_loop=1; greek_loop<grammar_first_array.length; greek_loop++)
				{
					grammar_second_array = grammar_first_array[greek_loop].split("</greek>");
					
					grammar_second_array[0] += " ";

					if (open_options_greek_polytonic == "yes")
					{
						for (var char_loop=0; char_loop<open_greek_polytonic_html_replacement.length; char_loop+=2)
						{
							while (grammar_second_array[0].indexOf(open_greek_polytonic_html_replacement[char_loop]) != -1)
							{
								grammar_second_array[0] = grammar_second_array[0].
									replace(open_greek_polytonic_html_replacement[char_loop], open_greek_polytonic_html_replacement[char_loop+1]);
							}
						}
					}
					else if (open_options_greek_polytonic == "no")
					{
						for (var char_loop=0; char_loop<open_greek_basic_html_replacement.length; char_loop+=2)
						{
							while (grammar_second_array[0].indexOf(open_greek_basic_html_replacement[char_loop]) != -1)
							{
								grammar_second_array[0] = grammar_second_array[0].
									replace(open_greek_basic_html_replacement[char_loop], open_greek_basic_html_replacement[char_loop+1]);
							}
						}
					}

					grammar_second_array[0] = grammar_second_array[0].replace(" ", "");

					grammar_first_array[greek_loop] = grammar_second_array.join("");
				}

				grammar_text = grammar_first_array.join("");

				while (grammar_text.indexOf("<td>") != -1) // changes all <td> to match color and font
				{
					grammar_text = grammar_text.replace("<td>", 
						"<td style='color:" + open_options_text_color + "; font-size:" + open_options_greek_font + ";'>");
				}

				document.getElementById("grammar_div").innerHTML = grammar_text;
			}

		}, 250);

		document.getElementById("top_div").style.display = "block";

		document.getElementById("top_prev_button").style.display = "none";
		document.getElementById("top_next_button").style.display = "none";

		document.getElementById("switch_select").style.display = "none";

		document.getElementById("search_button").style.display = "none";
	}
	else if (open_current_mode == "greek_tools" && open_current_book == 2)
	{
		open_current_root = [];

		for (var strongs_loop=0; strongs_loop<=5625; strongs_loop++)
		{
			open_current_root[strongs_loop] = open_greek_roots_array[strongs_loop] + " ";
	
			if (open_options_greek_polytonic == "yes")
			{
				for (var char_loop=0; char_loop<open_greek_polytonic_html_replacement.length; char_loop+=2)
				{
					while (open_current_root[strongs_loop].indexOf(open_greek_polytonic_html_replacement[char_loop]) != -1)
					{
						open_current_root[strongs_loop] = open_current_root[strongs_loop].
							replace(open_greek_polytonic_html_replacement[char_loop], open_greek_polytonic_html_replacement[char_loop+1]);
					}
				}
			}
			else if (open_options_greek_polytonic == "no")
			{
				for (var char_loop=0; char_loop<open_greek_basic_html_replacement.length; char_loop+=2)
				{
					while (open_current_root[strongs_loop].indexOf(open_greek_basic_html_replacement[char_loop]) != -1)
					{
						open_current_root[strongs_loop] = open_current_root[strongs_loop].
							replace(open_greek_basic_html_replacement[char_loop], open_greek_basic_html_replacement[char_loop+1]);
					}
				}
			}
	
			open_current_root[strongs_loop] = open_current_root[strongs_loop].replace(" ", "");
		}

		if (open_current_chapter <= 25)
		{
			document.getElementById("top_chapter_span").innerHTML = "<b>Greek Lexicon - &#" + parseInt(912 + open_current_chapter) + ";</b>";
		}
		else
		{
			document.getElementById("top_chapter_span").innerHTML = "<b>Greek Lexicon - Rare</b>";
		}

		document.getElementById("main_div").innerHTML = "";

		var alpha_letter, alpha_flag;

		var elem;

		for (var strongs_loop=1; strongs_loop<=5625; strongs_loop++)
		{
			alpha_letter = "*";

			for (var letter_loop=0; letter_loop<open_greek_roots_array[strongs_loop].length; letter_loop++)
			{
				if (open_greek_roots_array[strongs_loop].charAt(letter_loop).toUpperCase() != open_greek_roots_array[strongs_loop].charAt(letter_loop).toLowerCase())
				{
					alpha_letter = open_greek_roots_array[strongs_loop].charAt(letter_loop).toUpperCase();
				
					break;
				}
			}

			//if (open_current_root[strongs_loop] != "*")
			//{
				alpha_flag = false;

				switch (open_current_chapter)
				{
					case 1: { if (alpha_letter == "A") alpha_flag = true; break; }
					case 2: { if (alpha_letter == "B") alpha_flag = true; break; }
					case 3: { if (alpha_letter == "G") alpha_flag = true; break; }
					case 4: { if (alpha_letter == "D") alpha_flag = true; break; }
					case 5: { if (alpha_letter == "E") alpha_flag = true; break; }
					case 6: { if (alpha_letter == "Z") alpha_flag = true; break; }
					case 7: { if (alpha_letter == "H") alpha_flag = true; break; }
					case 8: { if (alpha_letter == "J") alpha_flag = true; break; }
					case 9: { if (alpha_letter == "I") alpha_flag = true; break; }
					case 10: { if (alpha_letter == "K") alpha_flag = true; break; }
					case 11: { if (alpha_letter == "L") alpha_flag = true; break; }
					case 12: { if (alpha_letter == "M") alpha_flag = true; break; }
					case 13: { if (alpha_letter == "N") alpha_flag = true; break; }
					case 14: { if (alpha_letter == "X") alpha_flag = true; break; }
					case 15: { if (alpha_letter == "O") alpha_flag = true; break; }
					case 16: { if (alpha_letter == "P") alpha_flag = true; break; }
					case 17: { if (alpha_letter == "R") alpha_flag = true; break; }
					case 18: { break; }
					case 19: { if (alpha_letter == "S") alpha_flag = true; break; }
					case 20: { if (alpha_letter == "T") alpha_flag = true; break; }
					case 21: { if (alpha_letter == "U") alpha_flag = true; break; }
					case 22: { if (alpha_letter == "F") alpha_flag = true; break; }
					case 23: { if (alpha_letter == "Q") alpha_flag = true; break; }
					case 24: { if (alpha_letter == "Y") alpha_flag = true; break; }
					case 25: { if (alpha_letter == "W") alpha_flag = true; break; }
					case 26: { if (alpha_letter == "*") alpha_flag = true; break; }
					default: { }
				}
	
				if (alpha_flag == true)
				{
					elem = document.createElement("input");
					elem.type = "checkbox";
					elem.setAttribute("data-strongs", strongs_loop + "");
					if (open_gloss_view_array[strongs_loop] == "show")
					{
						elem.checked = true;
					}
					else elem.checked = false;
					elem.addEventListener("change", function()
					{
						if (this.checked == true)
						{
							open_gloss_view_array[parseInt(this.getAttribute("data-strongs"))] = "show";
							
							localStorage.setItem("myGlossView" + this.getAttribute("data-strongs"), "show");
						}
						else
						{
							open_gloss_view_array[parseInt(this.getAttribute("data-strongs"))] = "hide";
							
							localStorage.setItem("myGlossView" + this.getAttribute("data-strongs"), "hide");
						}
					});
					document.getElementById("main_div").appendChild(elem);

					elem = document.createElement("input");
					elem.type = "text";
					elem.style.width = "60px";
					elem.style.fontSize = "8pt";
					elem.setAttribute("data-strongs", strongs_loop + "");
					elem.value = open_gloss_trans_array[strongs_loop];
					elem.addEventListener("change", function()
					{
						open_gloss_trans_array[parseInt(this.getAttribute("data-strongs"))] = this.value;
							
						localStorage.setItem("myGlossTrans" + this.getAttribute("data-strongs"), this.value);
					});
					document.getElementById("main_div").appendChild(elem);

					elem = document.createElement("span");
					elem.style.color = open_options_text_color;
					elem.style.fontSize = open_options_greek_font + "px";
					elem.innerHTML = "<b>" + strongs_loop + "</b> " + open_current_root[strongs_loop] + " = " +
						open_greek_translations_array[strongs_loop];
					document.getElementById("main_div").appendChild(elem);
			
					elem = document.createElement("br");
					document.getElementById("main_div").appendChild(elem);
				}
			//}
		}

		document.getElementById("top_div").style.display = "block";

		document.getElementById("top_prev_button").style.display = "inline";
		document.getElementById("top_next_button").style.display = "inline";

		document.getElementById("switch_select").style.display = "none";

		document.getElementById("search_button").style.display = "none";
	}
	else if (open_current_mode == "latin_tools" && open_current_book == 0)
	{
		document.getElementById("top_chapter_span").innerHTML = "<b>Latin Search</b>";

		document.getElementById("main_div").innerHTML = "";

		var parent, elem, select_elem;

		parent = document.createElement("div");
		parent.style.textAlign = "center";
		document.getElementById("main_div").appendChild(parent);

		select_elem = document.createElement("select");
		select_elem.id = "search_text_select";
		parent.appendChild(select_elem);

		elem = document.createElement("option");
		elem.value = "exact";
		elem.innerHTML = "Exact Phrase";
		select_elem.appendChild(elem);

		elem = document.createElement("option");
		elem.value = "contains";
		elem.innerHTML = "Contains Words";
		select_elem.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("input");
		elem.type = "text";
		elem.id = "search_text_input";
		elem.value = "";
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);
		
		elem = document.createElement("button");
		elem.id = "search_text_button";
		elem.innerHTML = "Search";
		elem.addEventListener("click", function()
		{
			var temp_count = 0;

			document.getElementById("message_label").innerHTML = "Searching...";

			document.getElementById("search_text_select").disabled = "disabled";
			document.getElementById("search_text_input").disabled = "disabled";
			document.getElementById("search_text_button").disabled = "disabled";

			document.getElementById("find_div").innerHTML = "";

			open_external_stage = 0;

			clearInterval(open_external_loop_interval);
			
			open_external_loop_interval = setInterval(function()
			{
				if (open_external_stage % 2 == 0)
				{
					open_external_string.value = "";

					var request = new XMLHttpRequest();

					var url_string = "";

					url_string = "Data/" + open_nt_name_listing[parseInt(open_external_stage/2)].
						replace(" ", "").replace(" ", "") + "Latin.txt";
		
					request.onreadystatechange = function()
					{
						if (request.readyState == 4 && request.status == 200)
						{
							open_external_string.value = request.responseText;
						}
					}
	
					request.open("GET", url_string, true);
					request.overrideMimeType("text/plain");
					request.setRequestHeader("Content-Type", "application/json");
					request.send();
	
					open_external_stage++;

					clearInterval(open_external_inner_interval);
		
					open_external_inner_interval = setInterval(function()
					{
						if (open_external_string.value != "")
						{
							clearInterval(open_external_inner_interval);

							open_latin_array = open_external_string.value.split("\n\n");

							for (var latin_loop=0; latin_loop<open_latin_array.length; latin_loop++)
							{
								while (open_latin_array[latin_loop].indexOf("  ") != -1)
								{
									open_latin_array[latin_loop] = open_latin_array[latin_loop].replace("  ", " ");
								}
							}

							open_external_string.value = "";

							clearInterval(open_external_inner_interval);

							var temp_array, temp_flag, temp_elem, temp_array, temp_inner_tally;

							for (var find_loop=0; find_loop<open_latin_array.length; find_loop++)
							{
								temp_array = open_latin_array[find_loop].split(" ").slice(2);

								open_current_root[find_loop] = open_latin_array[find_loop].split(" ")[0] + " " +
									open_latin_array[find_loop].split(" ")[1] + " ";

								for (var array_loop=0; array_loop<temp_array.length; array_loop+=2)
								{
									open_current_root[find_loop] += temp_array[array_loop] + " ";
								}

								open_current_transliteration[find_loop] = open_current_root[find_loop] + "";

								while (open_current_transliteration[find_loop].indexOf("'") != -1)
								{
									open_current_transliteration[find_loop] = open_current_transliteration[find_loop].replace("'", "");
								}

								open_current_latin[find_loop] = open_current_root[find_loop] + "";

								while (open_current_latin[find_loop].indexOf("'AE") != -1) { 
									open_current_latin[find_loop] = open_current_latin[find_loop].replace("'AE", "&#198;"); }
								while (open_current_latin[find_loop].indexOf("'ae") != -1) { 
									open_current_latin[find_loop] = open_current_latin[find_loop].replace("'ae", "&#230;"); }
								while (open_current_latin[find_loop].indexOf("'OE") != -1) { 
									open_current_latin[find_loop] = open_current_latin[find_loop].replace("'OE", "&#338;"); }
								while (open_current_latin[find_loop].indexOf("'oe") != -1) { 
									open_current_latin[find_loop] = open_current_latin[find_loop].replace("'oe", "&#339;"); }
								while (open_current_latin[find_loop].indexOf("'EE") != -1) { 
									open_current_latin[find_loop] = open_current_latin[find_loop].replace("'EE", "&#203;"); }
								while (open_current_latin[find_loop].indexOf("'ee") != -1) { 
									open_current_latin[find_loop] = open_current_latin[find_loop].replace("'ee", "&#235;"); }

								temp_flag = false;

								if (document.getElementById("search_text_select").value == "exact")
								{
									if (open_current_transliteration[find_loop].toUpperCase().indexOf(
										document.getElementById("search_text_input").value.toUpperCase()) != -1)
									{
										temp_flag = true;
									}
								}
								else if (document.getElementById("search_text_select").value == "contains")
								{
									temp_array = document.getElementById("search_text_input").value.split(" ");

									temp_inner_tally = 0;

									for (var inner_loop=0; inner_loop<temp_array.length; inner_loop++)
									{
										if (open_current_transliteration[find_loop].toUpperCase().indexOf(
											temp_array[inner_loop].toUpperCase()) != -1)
										{
											temp_inner_tally++;
										}
									}

									if (temp_inner_tally == temp_array.length)
									{
										temp_flag = true;
									}
								}

								if (temp_flag == true)
								{
									temp_count++;

									temp_elem = document.createElement("a");
									temp_elem.setAttribute("data-mode", "latin");
									temp_elem.setAttribute("data-location", open_current_latin[find_loop].split(" ")[1]);
									temp_elem.href = "#v" + temp_elem.getAttribute("data-location").split(":")[2];
									temp_elem.style.color = open_options_text_color;
									temp_elem.style.fontSize = open_options_latin_font + "px";
									temp_elem.innerHTML = open_nt_name_listing[
										parseInt(temp_elem.getAttribute("data-location").split(":")[0])] + " " +
										temp_elem.getAttribute("data-location").split(":")[1] + ":" + 
										temp_elem.getAttribute("data-location").split(":")[2];

									temp_elem.addEventListener("click", function()
									{
										localStorage.setItem("myMode", this.getAttribute("data-mode"));
										localStorage.setItem("myBook", this.getAttribute("data-location").split(":")[0]);
										localStorage.setItem("myChapter", this.getAttribute("data-location").split(":")[1]);
						
										document.getElementById("loading_div").style.display = "block";

										document.getElementById("top_div").style.display = "none";

										document.getElementById("main_div").innerHTML = "";
	
										Initialize();
									});
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("span");
									temp_elem.style.color = open_options_text_color;
									temp_elem.style.fontSize = open_options_latin_font + "px";
									temp_elem.innerHTML = "&nbsp;&nbsp;" + open_current_latin[find_loop].split(" ").splice(2).join(" ");
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("br");
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("br");
									document.getElementById("find_div").appendChild(temp_elem);
								}
							}

							open_external_stage++;

							if (open_external_stage == 2 * open_nt_name_listing.length)
							{
								clearInterval(open_external_loop_interval);

								document.getElementById("message_label").innerHTML = "Found " + temp_count + " Results";

								document.getElementById("search_text_select").disabled = false;
								document.getElementById("search_text_input").disabled = false;
								document.getElementById("search_text_button").disabled = false;

								temp_elem = document.createElement("span");
								temp_elem.style.fontSize = open_options_latin_font + "px";
								temp_elem.innerHTML = "Search Complete";
								document.getElementById("find_div").appendChild(temp_elem);
							}
						}
					}, 100);
				}
			}, 100);
		});
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("span");
		elem.id = "message_label";
		elem.innerHTML = "";
		parent.appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("div");
		elem.id = "find_div";
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		document.getElementById("top_div").style.display = "block";

		document.getElementById("top_prev_button").style.display = "none";
		document.getElementById("top_next_button").style.display = "none";

		document.getElementById("switch_select").style.display = "none";

		document.getElementById("search_button").style.display = "block";
		document.getElementById("search_button").innerHTML = "Go Back";
	}
	else if (open_current_mode == "latin_tools" && open_current_book == 1)
	{
		open_current_root = [];

		if (open_current_chapter <= 26)
		{
			document.getElementById("top_chapter_span").innerHTML = "<b>Latin Dictionary - &#" + parseInt(65 + open_current_chapter - 1) + ";</b>";
		}
		else
		{
			document.getElementById("top_chapter_span").innerHTML = "<b>Latin Dictionary - Others</b>";
		}

		document.getElementById("main_div").innerHTML = "";

		var alpha_letter, alpha_flag;

		var elem;

		for (var strongs_loop=1; strongs_loop<=6352; strongs_loop++)
		{
			alpha_letter = "*";

			for (var letter_loop=0; letter_loop<open_latin_roots_array[strongs_loop].length; letter_loop++)
			{
				if (open_latin_roots_array[strongs_loop].charAt(letter_loop).toUpperCase() !=
					open_latin_roots_array[strongs_loop].charAt(letter_loop).toLowerCase())
				{
					alpha_letter = open_latin_roots_array[strongs_loop].charAt(letter_loop).toUpperCase();
				
					break;
				}
			}

			//if (open_latin_roots_array[strongs_loop] != "*")
			//{
				alpha_flag = false;

				switch (open_current_chapter)
				{
					case 1: { if (alpha_letter == "A") alpha_flag = true; break; }
					case 2: { if (alpha_letter == "B") alpha_flag = true; break; }
					case 3: { if (alpha_letter == "C") alpha_flag = true; break; }
					case 4: { if (alpha_letter == "D") alpha_flag = true; break; }
					case 5: { if (alpha_letter == "E") alpha_flag = true; break; }
					case 6: { if (alpha_letter == "F") alpha_flag = true; break; }
					case 7: { if (alpha_letter == "G") alpha_flag = true; break; }
					case 8: { if (alpha_letter == "H") alpha_flag = true; break; }
					case 9: { if (alpha_letter == "I") alpha_flag = true; break; }
					case 10: { if (alpha_letter == "J") alpha_flag = true; break; }
					case 11: { if (alpha_letter == "K") alpha_flag = true; break; }
					case 12: { if (alpha_letter == "L") alpha_flag = true; break; }
					case 13: { if (alpha_letter == "M") alpha_flag = true; break; }
					case 14: { if (alpha_letter == "N") alpha_flag = true; break; }
					case 15: { if (alpha_letter == "O") alpha_flag = true; break; }
					case 16: { if (alpha_letter == "P") alpha_flag = true; break; }
					case 17: { if (alpha_letter == "Q") alpha_flag = true; break; }
					case 18: { if (alpha_letter == "R") alpha_flag = true; break; }
					case 19: { if (alpha_letter == "S") alpha_flag = true; break; }
					case 20: { if (alpha_letter == "T") alpha_flag = true; break; }
					case 21: { if (alpha_letter == "U") alpha_flag = true; break; }
					case 22: { if (alpha_letter == "V") alpha_flag = true; break; }
					case 23: { if (alpha_letter == "W") alpha_flag = true; break; }
					case 24: { if (alpha_letter == "X") alpha_flag = true; break; }
					case 25: { if (alpha_letter == "Y") alpha_flag = true; break; }
					case 26: { if (alpha_letter == "Z") alpha_flag = true; break; }
					case 27: { if (alpha_letter != "A" && alpha_letter != "B" && alpha_letter != "C" &&
						alpha_letter != "D" && alpha_letter != "E" && alpha_letter != "F" &&
						alpha_letter != "G" && alpha_letter != "H" && alpha_letter != "I" &&
						alpha_letter != "J" && alpha_letter != "K" && alpha_letter != "L" &&
						alpha_letter != "M" && alpha_letter != "N" && alpha_letter != "O" &&
						alpha_letter != "P" && alpha_letter != "Q" && alpha_letter != "R" &&
						alpha_letter != "S" && alpha_letter != "T" && alpha_letter != "U" &&
						alpha_letter != "V" && alpha_letter != "W" && alpha_letter != "X" &&
						alpha_letter != "Y" && alpha_letter != "Z") alpha_flag = true; break; }
					default: { }
				}
	
				if (alpha_flag == true)
				{
					elem = document.createElement("span");
					elem.style.color = open_options_text_color;
					elem.style.fontSize = open_options_latin_font + "px";
					elem.innerHTML = "<b>" + (open_current_chapter == 27 ? "* " + open_latin_roots_array[strongs_loop] : 
							open_latin_roots_array[strongs_loop]) + "</b> = <i>" +
						open_latin_translations_array[strongs_loop] + "</i>";

					if (open_latin_translations_array[strongs_loop] == "") elem.innerHTML += "*";
					document.getElementById("main_div").appendChild(elem);
			
					elem = document.createElement("br");
					document.getElementById("main_div").appendChild(elem);

					elem = document.createElement("br");
					document.getElementById("main_div").appendChild(elem);
				}
			//}
		}

		document.getElementById("top_div").style.display = "block";

		document.getElementById("top_prev_button").style.display = "inline";
		document.getElementById("top_next_button").style.display = "inline";

		document.getElementById("switch_select").style.display = "none";

		document.getElementById("search_button").style.display = "none";
	}
	else if (open_current_mode == "hebrew_tools" && open_current_book == 0)
	{
		document.getElementById("top_chapter_span").innerHTML = "<b>Hebrew Search</b>";

		document.getElementById("main_div").innerHTML = "";
		
		var parent, elem, select_elem;

		parent = document.createElement("div");
		parent.style.textAlign = "center";
		document.getElementById("main_div").appendChild(parent);

		select_elem = document.createElement("select");
		select_elem.id = "search_text_select";
		parent.appendChild(select_elem);

		elem = document.createElement("option");
		elem.value = "exact";
		elem.innerHTML = "Exact Phrase";
		select_elem.appendChild(elem);

		elem = document.createElement("option");
		elem.value = "contains";
		elem.innerHTML = "Contains Words";
		select_elem.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("input");
		elem.type = "text";
		elem.id = "search_text_input";
		elem.value = "";	
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("div");
		elem.id = "search_text_polytonic_div";
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_hebrew_font + "px";
		elem.innerHTML = "";
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("span");
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_popup_font + "px";
		elem.innerHTML = "(Upper and Lower case is important!)";
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);
		
		elem = document.createElement("button");
		elem.id = "search_text_button";
		elem.innerHTML = "Search";
		elem.addEventListener("click", function()
		{
			var temp_count = 0;

			document.getElementById("message_label").innerHTML = "Searching...";

			document.getElementById("search_text_select").disabled = "disabled";
			document.getElementById("search_text_input").disabled = "disabled";
			document.getElementById("search_text_button").disabled = "disabled";

			document.getElementById("find_div").innerHTML = "";

			open_external_stage = 0;

			clearInterval(open_external_loop_interval);
			
			open_external_loop_interval = setInterval(function()
			{
				if (open_external_stage % 2 == 0)
				{
					open_external_string.value = "";

					var request = new XMLHttpRequest();

					var url_string = "";

					url_string = "Data/" + open_ot_name_listing[parseInt(open_external_stage/2)].
						replace(" ", "").replace(" ", "") + "Hebrew.txt";
		
					request.onreadystatechange = function()
					{
						if (request.readyState == 4 && request.status == 200)
						{
							open_external_string.value = request.responseText;
						}
					}
	
					request.open("GET", url_string, true);
					request.overrideMimeType("text/plain");
					request.setRequestHeader("Content-Type", "application/json");
					request.send();
	
					open_external_stage++;

					clearInterval(open_external_inner_interval);
		
					open_external_inner_interval = setInterval(function()
					{
						if (open_external_string.value != "")
						{
							clearInterval(open_external_inner_interval);

							open_hebrew_array = open_external_string.value.split("\n\n");

							var seek_array = [];	

							open_current_hebrew = [];
							open_current_transliteration = [];
							open_current_polytonic = [];

							for (var full_loop=0; full_loop<open_hebrew_array.length; full_loop++)
							{
								open_current_hebrew[full_loop] = "";

								seek_array = open_hebrew_array[full_loop].split(" ").slice(2);
	
								for (var seek_loop=0; seek_loop<seek_array.length; seek_loop++)
								{
									open_current_hebrew[full_loop] += seek_array[seek_loop] + "  ";
								}

								open_current_transliteration[full_loop] = open_current_hebrew[full_loop] + "";

								while (open_current_transliteration[full_loop].indexOf("  ") != -1)
								{
									open_current_transliteration[full_loop] = open_current_transliteration[full_loop].replace("  ", " ");
								}

								open_current_polytonic[full_loop] = open_current_hebrew[full_loop] + "";
		
								for (var char_loop=0; char_loop<open_hebrew_html_replacement.length; char_loop+=2)
								{
									while (open_current_polytonic[full_loop].indexOf(open_hebrew_html_replacement[char_loop]) != -1)
									{
										open_current_polytonic[full_loop] = open_current_polytonic[full_loop].
											replace(open_hebrew_html_replacement[char_loop], open_hebrew_html_replacement[char_loop+1]);
									}
								}

								while (open_current_polytonic[full_loop].indexOf("  ") != -1)
								{
									open_current_polytonic[full_loop] = open_current_polytonic[full_loop].replace("  ", " ");
								}
							}

							open_external_string.value = "";

							clearInterval(open_external_inner_interval);

							var temp_flag, temp_elem, temp_array, temp_inner_tally;

							for (var find_loop=0; find_loop<open_hebrew_array.length; find_loop++)
							{
								temp_flag = false;

								if (document.getElementById("search_text_select").value == "exact")
								{
									if (open_current_transliteration[find_loop].indexOf(
										document.getElementById("search_text_input").value) != -1)
									{
										temp_flag = true;
									}
								}
								else if (document.getElementById("search_text_select").value == "contains")
								{
									temp_array = document.getElementById("search_text_input").value.split(" ");

									temp_inner_tally = 0;

									for (var inner_loop=0; inner_loop<temp_array.length; inner_loop++)
									{
										if (open_current_transliteration[find_loop].indexOf(
											temp_array[inner_loop]) != -1)
										{
											temp_inner_tally++;
										}
									}

									if (temp_inner_tally == temp_array.length)
									{
										temp_flag = true;
									}
								}

								if (temp_flag == true)
								{
									temp_count++;

									temp_elem = document.createElement("a");
									temp_elem.setAttribute("data-mode", "hebrew");
									temp_elem.setAttribute("data-location", open_hebrew_array[find_loop].split(" ")[1]);
									temp_elem.href = "#v" + temp_elem.getAttribute("data-location").split(":")[2];
									temp_elem.style.color = open_options_text_color;
									temp_elem.style.fontSize = open_options_hebrew_font + "px";
									temp_elem.innerHTML = open_ot_name_listing[
										parseInt(temp_elem.getAttribute("data-location").split(":")[0])] + " " +
										temp_elem.getAttribute("data-location").split(":")[1] + ":" + 
										temp_elem.getAttribute("data-location").split(":")[2];

									temp_elem.addEventListener("click", function()
									{
										localStorage.setItem("myMode", this.getAttribute("data-mode"));
										localStorage.setItem("myBook", this.getAttribute("data-location").split(":")[0]);
										localStorage.setItem("myChapter", this.getAttribute("data-location").split(":")[1]);
						
										document.getElementById("loading_div").style.display = "block";

										document.getElementById("top_div").style.display = "none";

										document.getElementById("main_div").innerHTML = "";
	
										Initialize();
									});
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("br");
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("span");
									temp_elem.style.color = open_options_text_color;
									temp_elem.style.fontSize = open_options_hebrew_font + "px";
									temp_elem.innerHTML = "&nbsp;&nbsp;" + open_current_polytonic[find_loop];
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("br");
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("br");
									document.getElementById("find_div").appendChild(temp_elem);
								}
							}

							open_external_stage++;

							if (open_external_stage == 2 * open_ot_name_listing.length)
							{
								clearInterval(open_external_loop_interval);

								document.getElementById("message_label").innerHTML = "Found " + temp_count + " Results";

								document.getElementById("search_text_select").disabled = false;
								document.getElementById("search_text_input").disabled = false;
								document.getElementById("search_text_button").disabled = false;

								temp_elem = document.createElement("span");
								temp_elem.style.fontSize = open_options_hebrew_font + "px";
								temp_elem.innerHTML = "Search Complete";
								document.getElementById("find_div").appendChild(temp_elem);
							}
						}
					}, 100);
				}
			}, 100);
		});
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("a");
		elem.href = "#";
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_hebrew_font + "px";
		elem.innerHTML = "Click for Hebrew Letters";
		elem.addEventListener("click", function()
		{
			if (document.getElementById("hebrew_help_table").style.display == "none")
			{
				document.getElementById("hebrew_help_table").style.display = "inline-block";
			}
			else
			{
				document.getElementById("hebrew_help_table").style.display = "none";
			}
		});
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("table");
		elem.id = "hebrew_help_table";
		elem.style.display = "table";
		elem.style.tableLayout = "fixed";
		elem.style.width = "100%";
		elem.style.maxWidth = "400px";
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_hebrew_font + "px";
		elem.style.display = "none";

		var temp_row, temp_cell, temp_button;

		temp_row = document.createElement("tr");
		temp_row.style.display = "table";
		temp_row.style.width = "100%";
		elem.appendChild(temp_row);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "'&nbsp;<br>&#1488;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "'"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "b&nbsp;<br>&#1489;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "b"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "g&nbsp;<br>&#1490;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "g"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "d&nbsp;<br>&#1491;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "d"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "h&nbsp;<br>&#1492;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "h"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "w&nbsp;<br>&#1493;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "w"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "z&nbsp;<br>&#1494;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "z"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "c&nbsp;<br>&#1495;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "c"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "t&nbsp;<br>&#1496;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "t"; });
		temp_cell.appendChild(temp_button);

		temp_row = document.createElement("tr");
		temp_row.style.display = "table";
		temp_row.style.width = "100%";
		elem.appendChild(temp_row);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "y&nbsp;<br>&#1497;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "y"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "k&nbsp;<br>&#1499;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "k"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "K&nbsp;<br>&#1498;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "K"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "l&nbsp;<br>&#1500;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "l"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "m&nbsp;<br>&#1502;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "m"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "M&nbsp;<br>&#1501;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "M"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "n&nbsp;<br>&#1504;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "p"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "N&nbsp;<br>&#1503;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "N"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "s&nbsp;<br>&#1505;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "s"; });
		temp_cell.appendChild(temp_button);

		temp_row = document.createElement("tr");
		temp_row.style.display = "table";
		temp_row.style.width = "100%";
		elem.appendChild(temp_row);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "`&nbsp;<br>&#1506;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "`"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "p&nbsp;<br>&#1508;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "p"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "P&nbsp;<br>&#1507;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "P"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "j&nbsp;<br>&#1510;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "j"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "J&nbsp;<br>&#1509;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "J"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "q&nbsp;<br>&#1511;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "q"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "r&nbsp;<br>&#1512;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "r"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "x&nbsp;<br>&#1513;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "x"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "T&nbsp;<br>&#1514;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "T"; });
		temp_cell.appendChild(temp_button);

		temp_row = document.createElement("tr");
		temp_row.style.display = "table";
		temp_row.style.width = "100%";
		elem.appendChild(temp_row);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = "-&nbsp;<br>&#1470;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += "-"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);
	
		temp_button = document.createElement("button");
		temp_button.innerHTML = ":&nbsp;<br>&#1475;&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += ":"; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);

		temp_button = document.createElement("button");
		temp_button.innerHTML = "_&nbsp;<br>_&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false) 
			document.getElementById("search_text_input").value += " "; });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.style.width = "11%";
		temp_row.appendChild(temp_cell);

		temp_button = document.createElement("button");
		temp_button.innerHTML = "<&nbsp;<br><&nbsp;";
		temp_button.style.width = "100%";
		temp_button.addEventListener("click", function() { if (document.getElementById("search_text_input").disabled == false)
			document.getElementById("search_text_input").value =
				document.getElementById("search_text_input").value.
					substring(0, document.getElementById("search_text_input").value.length-1); });
		temp_cell.appendChild(temp_button);

		temp_cell = document.createElement("td");
		temp_cell.innerHTML = "&nbsp;&nbsp;<br>&nbsp;&nbsp;";
		temp_cell.style.width = "11%";
		temp_cell.style.backgroundColor = open_options_background_color;
		temp_cell.style.color = open_options_text_color;
		temp_cell.style.fontSize = open_options_hebrew_font + "px";
		temp_row.appendChild(temp_cell);

		temp_cell = document.createElement("td");
		temp_cell.innerHTML = "&nbsp;&nbsp;<br>&nbsp;&nbsp;";
		temp_cell.style.width = "11%";
		temp_cell.style.backgroundColor = open_options_background_color;
		temp_cell.style.color = open_options_text_color;
		temp_cell.style.fontSize = open_options_hebrew_font + "px";
		temp_row.appendChild(temp_cell);

		temp_cell = document.createElement("td");
		temp_cell.innerHTML = "&nbsp;&nbsp;<br>&nbsp;&nbsp;";
		temp_cell.style.width = "11%";
		temp_cell.style.backgroundColor = open_options_background_color;
		temp_cell.style.color = open_options_text_color;
		temp_cell.style.fontSize = open_options_hebrew_font + "px";
		temp_row.appendChild(temp_cell);

		temp_cell = document.createElement("td");
		temp_cell.innerHTML = "&nbsp;&nbsp;<br>&nbsp;&nbsp;";
		temp_cell.style.width = "11%";
		temp_cell.style.backgroundColor = open_options_background_color;
		temp_cell.style.color = open_options_text_color;
		temp_cell.style.fontSize = open_options_hebrew_font + "px";
		temp_row.appendChild(temp_cell);

		temp_cell = document.createElement("td");
		temp_cell.innerHTML = "&nbsp;&nbsp;<br>&nbsp;&nbsp;";
		temp_cell.style.width = "11%";
		temp_cell.style.backgroundColor = open_options_background_color;
		temp_cell.style.color = open_options_text_color;
		temp_cell.style.fontSize = open_options_hebrew_font + "px";
		temp_row.appendChild(temp_cell);

		parent.appendChild(elem);
		
		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("span");
		elem.style.color = open_options_text_color;
		elem.style.fontSize = open_options_hebrew_font + "px";
		elem.id = "message_label";
		elem.innerHTML = "";
		parent.appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("div");
		elem.id = "find_div";
		elem.style.textAlign = "right";
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		open_search_text_interval = setInterval(function()
		{	
			var temp_polytonic = document.getElementById("search_text_input").value + "";
		
			for (var char_loop=0; char_loop<open_hebrew_html_replacement.length; char_loop+=2)
			{
				while (temp_polytonic.indexOf(open_hebrew_html_replacement[char_loop]) != -1)
				{
					temp_polytonic = temp_polytonic.replace(open_hebrew_html_replacement[char_loop], 
						open_hebrew_html_replacement[char_loop+1]);
				}
			}
		
			document.getElementById("search_text_polytonic_div").innerHTML = temp_polytonic;
		}, 250);

		document.getElementById("top_div").style.display = "block";

		document.getElementById("top_prev_button").style.display = "none";
		document.getElementById("top_next_button").style.display = "none";

		document.getElementById("switch_select").style.display = "none";

		document.getElementById("search_button").style.display = "block";
		document.getElementById("search_button").innerHTML = "Go Back";
	}
	else if (open_current_mode == "english_tools" && open_current_book == 0)
	{
		document.getElementById("top_chapter_span").innerHTML = "<b>English Search</b>";

		document.getElementById("main_div").innerHTML = "";
		
		var parent, elem, select_elem;

		parent = document.createElement("div");
		parent.style.textAlign = "center";
		document.getElementById("main_div").appendChild(parent);

		select_elem = document.createElement("select");
		select_elem.id = "search_text_select";
		parent.appendChild(select_elem);

		elem = document.createElement("option");
		elem.value = "exact";
		elem.innerHTML = "Exact Phrase";
		select_elem.appendChild(elem);

		elem = document.createElement("option");
		elem.value = "contains";
		elem.innerHTML = "Contains Words";
		select_elem.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("input");
		elem.type = "text";
		elem.id = "search_text_input";
		elem.value = "";
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);
		
		elem = document.createElement("button");
		elem.id = "search_text_button";
		elem.innerHTML = "Search";
		elem.addEventListener("click", function()
		{
			var temp_count = 0;

			document.getElementById("message_label").innerHTML = "Searching...";

			document.getElementById("search_text_select").disabled = "disabled";
			document.getElementById("search_text_input").disabled = "disabled";
			document.getElementById("search_text_button").disabled = "disabled";

			document.getElementById("find_div").innerHTML = "";

			open_external_stage = 0;

			clearInterval(open_external_loop_interval);
			
			open_external_loop_interval = setInterval(function()
			{
				if (open_external_stage % 2 == 0)
				{
					open_external_string.value = "";

					var request = new XMLHttpRequest();

					var url_string = "";

					if (open_external_stage < 2 * open_ot_name_listing.length)
					{
						url_string = "Data/" + open_ot_name_listing[parseInt(open_external_stage/2)].replace(" ", "").replace(" ", "") + "English.txt";
					}
					else
					{
						url_string = "Data/" + open_nt_name_listing[parseInt(open_external_stage/2)-
							open_ot_name_listing.length].replace(" ", "").replace(" ", "") + "English.txt";
					}
		
					request.onreadystatechange = function()
					{
						if (request.readyState == 4 && request.status == 200)
						{
							open_external_string.value = request.responseText;
						}
					}
	
					request.open("GET", url_string, true);
					request.overrideMimeType("text/plain");
					request.setRequestHeader("Content-Type", "application/json");
					request.send();
	
					open_external_stage++;

					clearInterval(open_external_inner_interval);
		
					open_external_inner_interval = setInterval(function()
					{
						if (open_external_string.value != "")
						{
							clearInterval(open_external_inner_interval);

							open_english_array = open_external_string.value.split("\n\n");

							for (var english_loop=0; english_loop<open_english_array.length; english_loop++)
							{
								while (open_english_array[english_loop].indexOf("  ") != -1)
								{
									open_english_array[english_loop] = open_english_array[english_loop].replace("  ", " ");
								}

								while (open_english_array[english_loop].indexOf(" [ ") != -1)
								{
									open_english_array[english_loop] = open_english_array[english_loop].replace(" [ ", " <i>");
								}

								while (open_english_array[english_loop].indexOf(" ]") != -1)
								{
									open_english_array[english_loop] = open_english_array[english_loop].replace(" ]", "</i>");
								}
		
								while (open_english_array[english_loop].indexOf(" \\ ") != -1)
								{
									open_english_array[english_loop] = open_english_array[english_loop].replace(" \\ ", 
										" <span style='color:" + open_options_jesus_color + "'>");
								}

								while (open_english_array[english_loop].indexOf(" /") != -1)
								{
									open_english_array[english_loop] = open_english_array[english_loop].replace(" /", "</span>");
								}
							}

							open_external_string.value = "";

							clearInterval(open_external_inner_interval);

							var temp_flag, temp_elem, temp_array, temp_inner_tally;

							for (var find_loop=0; find_loop<open_english_array.length; find_loop++)
							{
								temp_flag = false;

								if (document.getElementById("search_text_select").value == "exact")
								{
									if (open_english_array[find_loop].toUpperCase().indexOf(
										document.getElementById("search_text_input").value.toUpperCase()) != -1)
									{
										temp_flag = true;
									}
								}
								else if (document.getElementById("search_text_select").value == "contains")
								{
									temp_array = document.getElementById("search_text_input").value.split(" ");

									temp_inner_tally = 0;

									for (var inner_loop=0; inner_loop<temp_array.length; inner_loop++)
									{
										if (open_english_array[find_loop].toUpperCase().indexOf(
											temp_array[inner_loop].toUpperCase()) != -1)
										{
											temp_inner_tally++;
										}
									}

									if (temp_inner_tally == temp_array.length)
									{
										temp_flag = true;
									}
								}

								if (temp_flag == true)
								{
									temp_count++;

									temp_elem = document.createElement("a");
									if (open_external_stage < 2 * open_ot_name_listing.length)
									{
										temp_elem.setAttribute("data-mode", "english_ot");
									}
									else
									{
										temp_elem.setAttribute("data-mode", "english_nt");
									}
									temp_elem.setAttribute("data-location", open_english_array[find_loop].split(" ")[1]);
									temp_elem.href = "#v" + temp_elem.getAttribute("data-location").split(":")[2];
									temp_elem.style.color = open_options_text_color;
									temp_elem.style.fontSize = open_options_english_font + "px";
									if (open_external_stage < 2 * open_ot_name_listing.length)
									{
										temp_elem.innerHTML = open_ot_name_listing[
											parseInt(temp_elem.getAttribute("data-location").split(":")[0])] + " " +
											temp_elem.getAttribute("data-location").split(":")[1] + ":" + 
											temp_elem.getAttribute("data-location").split(":")[2];
									}
									else
									{
										temp_elem.innerHTML = open_nt_name_listing[
											parseInt(temp_elem.getAttribute("data-location").split(":")[0])] + " " +
											temp_elem.getAttribute("data-location").split(":")[1] + ":" + 
											temp_elem.getAttribute("data-location").split(":")[2];
									}

									temp_elem.addEventListener("click", function()
									{
										localStorage.setItem("myMode", this.getAttribute("data-mode"));
										localStorage.setItem("myBook", this.getAttribute("data-location").split(":")[0]);
										localStorage.setItem("myChapter", this.getAttribute("data-location").split(":")[1]);
						
										document.getElementById("loading_div").style.display = "block";

										document.getElementById("top_div").style.display = "none";

										document.getElementById("main_div").innerHTML = "";
	
										Initialize();
									});
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("span");
									temp_elem.style.color = open_options_text_color;
									temp_elem.style.fontSize = open_options_english_font + "px";
									temp_elem.innerHTML = "&nbsp;&nbsp;" + open_english_array[find_loop].split(" ").splice(2).join(" ");
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("br");
									document.getElementById("find_div").appendChild(temp_elem);

									temp_elem = document.createElement("br");
									document.getElementById("find_div").appendChild(temp_elem);
								}
							}

							open_external_stage++;

							if (open_external_stage == 2 * (open_ot_name_listing.length + open_nt_name_listing.length))
							{
								clearInterval(open_external_loop_interval);

								document.getElementById("message_label").innerHTML = "Found " + temp_count + " Results";

								document.getElementById("search_text_select").disabled = false;
								document.getElementById("search_text_input").disabled = false;
								document.getElementById("search_text_button").disabled = false;

								temp_elem = document.createElement("span");
								temp_elem.style.fontSize = open_options_english_font + "px";
								temp_elem.innerHTML = "Search Complete";
								document.getElementById("find_div").appendChild(temp_elem);
							}
						}
					}, 100);
				}
			}, 100);
		});
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("br");
		parent.appendChild(elem);

		elem = document.createElement("span");
		elem.id = "message_label";
		elem.innerHTML = "";
		parent.appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("div");
		elem.id = "find_div";
		document.getElementById("main_div").appendChild(elem);

		elem = document.createElement("br");
		document.getElementById("main_div").appendChild(elem);

		document.getElementById("top_div").style.display = "block";

		document.getElementById("top_prev_button").style.display = "none";
		document.getElementById("top_next_button").style.display = "none";

		document.getElementById("switch_select").style.display = "none";

		document.getElementById("search_button").style.display = "block";
		document.getElementById("search_button").innerHTML = "Go Back";
	}
	else if (open_current_mode == "english_tools" && open_current_book == 1)
	{
		document.getElementById("top_chapter_span").innerHTML = "<b>English Random Chapter</b>";

		document.getElementById("main_div").innerHTML = "";

		var parent, elem;

		parent = document.createElement("div");
		parent.style.textAlign = "center";
		document.getElementById("main_div").appendChild(parent);

		elem = document.createElement("button");
		elem.id = "random_button";
		elem.innerHTML = "Jump to a Random Chapter";
		elem.addEventListener("click", function()
		{
			var rand_pick = parseInt(Math.random() * 2);

			if (rand_pick == 0)
			{
				localStorage.setItem("myMode", "english_ot");
	
				rand_pick = parseInt(Math.random() * open_ot_name_listing.length);
	
				localStorage.setItem("myBook", rand_pick);
				localStorage.setItem("myChapter", parseInt(Math.random() * open_ot_range_listing[rand_pick]) + 1);
			}
			else if (rand_pick == 1)
			{
				localStorage.setItem("myMode", "english_nt");
	
				rand_pick = parseInt(Math.random() * open_nt_name_listing.length);
	
				localStorage.setItem("myBook", rand_pick);
				localStorage.setItem("myChapter", parseInt(Math.random() * open_nt_range_listing[rand_pick]) + 1);
			}

			document.getElementById("loading_div").style.display = "block";

			document.getElementById("top_div").style.display = "none";

			document.getElementById("main_div").innerHTML = "";

			Initialize();
		});
		parent.appendChild(elem);	

		document.getElementById("top_div").style.display = "block";

		document.getElementById("top_prev_button").style.display = "none";
		document.getElementById("top_next_button").style.display = "none";

		document.getElementById("switch_select").style.display = "none";

		document.getElementById("search_button").style.display = "none";
	}

	document.getElementById("top_div").style.fontSize = open_options_menu_font + "px";
	document.getElementById("bottom_div").style.fontSize = open_options_menu_font + "px";

	document.getElementById("main_div").style.color = open_options_text_color;
	document.getElementById("top_div").style.color = open_options_text_color;
	document.getElementById("bottom_div").style.color = open_options_text_color;
	document.getElementById("popup_div").style.color = open_options_text_color;
	document.getElementById("menu_div").style.color = open_options_text_color;

	document.getElementById("main_div").style.backgroundColor = open_options_background_color;
	document.getElementById("top_div").style.backgroundColor = open_options_background_color;
	document.getElementById("bottom_div").style.backgroundColor = open_options_background_color;
	document.getElementById("popup_div").style.backgroundColor = open_options_background_color;
	document.getElementById("menu_div").style.backgroundColor = open_options_background_color;

	document.getElementById("loading_div").style.color = open_options_text_color;
	document.getElementById("loading_div").style.backgroundColor = open_options_background_color;

	document.body.style.backgroundColor = open_options_background_color;

	setTimeout(function()
	{
		if (open_first_load == true)
		{
			open_first_load = false;

			if (localStorage.getItem("myScrollTop"))
			{
				document.body.scrollTop = localStorage.getItem("myScrollTop");
			}
		}
		else
		{
			var temp_elem = document.createElement("a");
			if (document.location.href.indexOf("#") == -1) temp_elem.href = document.location.href + "#";
			else temp_elem.href = document.location.href;
			temp_elem.style.display = "none";
			document.getElementById("main_div").appendChild(temp_elem);
			temp_elem.click();
		}

	}, 250);

	return;
};


