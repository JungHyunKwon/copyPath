/**
 * @names copyDirectory
 * @author JungHyunKwon
 * @since 2019-09-05
 */

'use strict';

const fs = require('fs-extra'),
	  filenamify = require('filenamify'),
	  readline = require('readline'),
	  rl = readline.createInterface({
	      input : process.stdin,
		  output : process.stdout
	  });

/**
 * @param {obejct} options {
       directory : string,
	   saveDirectory : string,
	   names : array
   }
   @param {function} callback
 * @since 2018-09-05
 */
function copyDirectory(options, callback) {
	let directory = options.directory;

	//문자일 때
	if(typeof directory === 'string') {
		let saveDirectory = options.saveDirectory;

		//문자일 때
		if(typeof saveDirectory === 'string') {
			let names = options.names;

			//배열일 때
			if(Array.isArray(names)) {
				let namesLength = names.length;

				(function loopNames(index) {
					//이름 개수만큼 반복
					if(namesLength > index) {
						let savePath = saveDirectory + '/' + filenamify(names[index], {
							replacement : ''
						});

						fs.copy(directory, savePath, (err) => {
							//오류가 있을 때
							if(err) {
								console.error(savePath + '에 복사 실패하였습니다.');
							}else{
								console.log(savePath + '에 복사하였습니다.');
							}
							
							loopNames(index + 1);
						});
					
					//함수일 때
					}else if(typeof callback === 'function') {
						callback();
					}
				})(0);
			}else{
				console.error('names : 배열이 아닙니다.');
			}
		}else{
			console.error('saveDirectory : 문자가 아닙니다.');
		}
	}else{
		console.error('directory : 문자가 아닙니다.');
	}
}

//질문
rl.question('경로 : ', (directory) => {
	//값이 있을 때
	if(directory) {
		rl.question('저장 경로 : ', (saveDirectory) => {
			//값이 있을 때
			if(saveDirectory) {
				console.log('\n쉼표로 구분할 수 있습니다.\n');

				rl.question('이름 : ', (names) => {
					//값이 있을 때
					if(names) {
						copyDirectory({
							directory : directory,
							saveDirectory : saveDirectory,
							names : names.split(',')
						}, () => {
							console.log('작업을 완료하였습니다.');
						});
					}else{
						console.error('이름을 입력해주세요');
					}

					rl.close();
				});
			}else{
				console.error('저장 경로를 입력해주세요');
				rl.close();	
			}
		});
	}else{
		console.error('경로를 입력해주세요');
		rl.close();
	}
});