'use strict';

/*Русская клавиатура   */ const keyboard_rus = [
	'й','ц','у','к','е','н','г','ш','щ','з','х','ъ',
	'ф','ы','в','а','п','р','о','л','д','ж','э',
	'я','ч','с','м','и','т','ь','б','ю'];
	
/*Английская клавиатура*/ const keyboard_eng = [
	'q','w','e','r','t','y','u','i','o','p','[',']',
	'a','s','d','f','g','h','j','k','l',';','\'',
	'z','x','c','v','b','n','m',',','.'];

/*Русский алфавит   */ const alph_rus = ['а','б','в','в','г','д',
'е','ё','ж','з','и','й',
'к','л','м','н','о',
'п','р','с','т','у','у',
'ф','ф','ф','х','ц','ч','ш',
'щ','ъ','ь','ы','э',
'ю','я'];

/*Английская клавиатура*/ const alph_eng = ['a','b','v','w','g','d',
  'e','yo','zh','z','i','q',
//'е','ё','ж','з','и','й',
  'k','l','m','n','o',
//'к','л','м','н','о',
  'p','r','s','t','y','u',
//'п','р','с','т','у','у',
  'f','ph','pf','h','c','ch','sh',
//'ф', 'ф','ф', 'х','ц','ч','ш',
  'shch','\"','\'','y','e',
//'щ','ъ','ь','ы','э',
  'yu','ya'
//'ю','я'
];
var counter_for_first_label = 0;

function toUorLcase(letter) {
	return letter.split('').some( 
		(item) => {	
		  if (item === item.toUpperCase() && item !== '\''
		   && item !== '\"' && item !== '\`') 
			return true; });
}

function conversion(letter, alphab1, alphab2) {
  //--------------Находим букву в массиве с английской клавой.
	let position = alphab1.indexOf(letter.toLowerCase());	
  //--------------Нашли индекс и вернули нужную русскую букву.
	if ( position === -1)
	  return letter;	

	if (counter_for_first_label === 1 && toUorLcase(letter))	
	  return alphab2[ position ].toUpperCase();
	else
	  return alphab2[ position ];
}
function proof(element) {
	//определяет, транслит это или человек ошибся.
	
	// проверяет на то, надо ли переводить строку.
	return {proof:true, 
		alphab1: alph_eng, 
		alphab2: alph_rus};
}
function reducer(newString, word) { //в конце вернёт newString
	 
	var proofer = proof(word);
  //------------------------валидация на перевод
		  if ( proofer.proof ) 
		  {
			counter_for_first_label = 0;
			while(word != ''){//цикл гарантирует то, что мы пробегаем по всему слову
				//режем слово на буквы.
				var letter_shch = word.substr(0, 4);
				var letter_2 = word.substr(0, 2);
				var letter = word.substr(0, 1);
				counter_for_first_label++;

				if (letter_shch != conversion(letter_shch, proofer.alphab1, proofer.alphab2))
				{
				  newString += conversion(letter_shch, proofer.alphab1, proofer.alphab2);
				  word = word.slice(4);
				}
				else if (letter_2 != conversion(letter_2, proofer.alphab1, proofer.alphab2))
				{
				  newString += conversion(letter_2, proofer.alphab1, proofer.alphab2);
				  word = word.slice(2);
				}
				else if (letter != conversion(letter, proofer.alphab1, proofer.alphab2))
				{
				  newString += conversion(letter, proofer.alphab1, proofer.alphab2);
				  word = word.slice(1);
				}
				else 
				{
				  newString += letter;
				  word = word.slice(1);
				}
			}
			 
			return newString + ' ';
		  }	  
  //------------------------обычное слово, переводить НЕ нужно	 	
		  else return newString += word + ' ';	
}
function translator(string) { //Возвращает исправленное предложение.
 //делаем массив слов из строки
  let speech = string.split(' ');
 //переводим слова, которые прошли проверку.
  let s = speech.reduce(reducer, '');
 //Возвращаем готовую строчку. 
  return s.split(',').join('');
}

//Тут нужно с дискорда брать строку, но я для проверки просто закину свою
alert(
  translator( prompt('Type words to translator', 'phazan Esmiral\'da phewral\' EKVILIBRÍSTIKA!$!@$^*& ') )
);