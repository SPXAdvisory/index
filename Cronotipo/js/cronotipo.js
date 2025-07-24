window.addEventListener('load', function(){
    
    // Variables..
    var initialTestButton = document.querySelector('.bh-initial');
    var initialCardTeste = document.querySelector('.bh-card-initial');
    var middleCardTeste = document.querySelector('.bh-card-middle');
    var ultimateCardTeste = document.querySelector('.bh-card-ultimate');
    var resultButton = document.querySelector('.btn-result');
    var nextButton = document.querySelector('.btn-next');
    var prevButton = document.querySelector('.btn-prev');
    var slideQuestions = document.querySelectorAll('.options-quiz');
    var progressBar = document.querySelector('.progress-quiz span');
    var progressQuizNumber = document.querySelector('.progress-quiz i');
    var lll = false;

    var stripOptionQuiz = document.querySelectorAll('.stripe-quiz');

    var result = 0, position, counter = [], history = [], keyHistory, reKeyHistory;


    // Events
    initialTestButton.addEventListener('click', function(){
        initialCardTeste.classList.add('card-out');
        document.querySelector('.wait-card').classList.add('active');
        setTimeout(function(){
            document.querySelector('.wait-card').classList.add('slow-fadein');
        }, 0);

        progressQuizNumber.innerText = '1';

    }, false);


    var clearChoose = function(){
        for(var i=0, lng = stripOptionQuiz1.length; i<lng; i++){
            stripOptionQuiz1[i].classList.remove('choose-question-quiz')
        }
    }


    var loopQuestionQuiz = function(quizLoop){
        var clearChoose = function(){
            for(var i=0, lng = quizLoop.length; i<lng; i++){
                quizLoop[i].classList.remove('choose-question-quiz')
            }
        }

        var storeHistory = function(){         
            for(var i=0, lng = history.length; i<lng; i++){
                var ref = history[i];
                stripOptionQuiz[ref].classList.add('choose-question-quiz');
            }   
        }

        
        for(var i=0, lng = quizLoop.length; i<lng; i++){
            
            (function(el){
                quizLoop[el].addEventListener('click', function(){
                    lll = true;
                    clearChoose();
                    keyHistory = el;
                    this.classList.add('choose-question-quiz');
                    
                    position = this.parentElement.getAttribute('data-position');
                    nextButton.classList.add('btn-quiz-next');
                    if(position >= 19 ) resultButton.classList.add('btn-quiz-result');

                    var arrRef = position - 1; 

                    counter[arrRef] = parseInt(this.getAttribute('data-points'));
                    // console.log('Contador --> ',counter)
                    
                    history[arrRef] = keyHistory;

                    // console.log('Histórico --> ',history)
                    // console.log(arrRef, '----', history);
                    storeHistory(); 
                    nextState();

                    if(position == '19'){
                        resultState();
                    } 
              
                }, false);
            })(i)
        }    
    }

    loopQuestionQuiz(stripOptionQuiz);


    // Interation slide
    var interateSlide = function(position, status){

        for(var i=0, lng = slideQuestions.length; i<lng; i++){
            slideQuestions[i].classList.remove('active');
        }

        (position == history.length) ? nextButton.classList.remove('btn-quiz-next') : nextButton.classList.add('btn-quiz-next');

        slideQuestions[position].classList.add('active');
        
        (position >= 1) ? prevButton.style.display = 'block' : prevButton.style.display = 'none';
        
        if(status){
            var des = position -1;
            progressBar.classList.remove('prg-'+String(des)+'');
            progressBar.classList.add('prg-'+position+'');
        }else{
            var asc = position + 1;
            progressBar.classList.remove('prg-'+String(asc)+'');
            progressBar.classList.add('prg-'+position+'');
        }
        
    }


    function nextState(){
        if (position < history.length){
            if(lll){
                position;
                lll = false;
            }else{
                if(position <= 18) position++;  
            }
            
        }else{
            result+=counter;
        }

        interateSlide(parseInt(position), true);
        progressQuizNumber.innerText = parseInt(position) + 1;

        if(position == '18'){
            nextButton.style.display = 'none';
            resultButton.style.display = 'block';
        } 
    }
    

    // Next question    
    nextButton.addEventListener('click', function(){
        nextState();
        // if (position < history.length){
        //     if(lll){
        //         position;
        //         lll = false;
        //     }else{
        //         if(position <= 18) position++;  
        //     }
            
        // }else{
        //     result+=counter;
        // }

        // interateSlide(parseInt(position), true);
        // progressQuizNumber.innerText = parseInt(position) + 1;

        // if(position == '18'){
        //     this.style.display = 'none';
        //     resultButton.style.display = 'block';
        // } 

    }, false);

    prevButton.addEventListener('click', function(){
        var freezePosition = position;
        position = --position;
        interateSlide(parseInt(position), false);
        progressQuizNumber.innerText = parseInt(freezePosition);
        // console.log(position, '----', history.length);
        // storeHistory();

        // console.log(position);

        if(position != '18'){
            nextButton.style.display = 'block';
            resultButton.style.display = 'none';
        } 
    })

    function resultState(){
        var reducer = function(accumulator, currentValue) { return accumulator + currentValue };
        result = counter.reduce(reducer);

        // console.log(result);


        middleCardTeste.classList.add('card-out');
        document.querySelector('.bh-card-ultimate').classList.add('active');

        setTimeout(function(){
            document.querySelector('.wait-card').classList.remove('active');
            document.querySelector('.bh-card-ultimate').classList.add('slow-fadein');
        }, 200);

        var resultTest = document.querySelector('.ultimate-result-test');

        var resultReference = parseInt(result, 10);

        var rs = resultReference;

        // if(rs >= Number(15) && rs <= Number(30)){
        //     resultTest.innerText = 'Vespertino Extremo';
        // }else  if(rs >= Number(31) && rs <= Number(41)){
        //     resultTest.innerText = 'Moderadamente Vespertino';
        // }else  if(rs >= Number(42) && rs <= Number(58)){
        //     resultTest.innerText = 'Indiferente';
        // }else  if(rs >= Number(59) && rs <= Number(69)){
        //     resultTest.innerText = 'Moderadamente matutino'
        // }else  if(rs >= Number(70) && rs <= Number(86)){
        //     resultTest.innerText = 'Matutino extremo';
        // }

		if(isNaN(rs)) {
			rs = 0;
			[].slice.call(document.querySelectorAll(".stripe-quiz.choose-question-quiz")).forEach(function(quest) {
				rs += Number(quest.dataset.points);
			});
		}

        if(rs >= Number(15) && rs <= Number(30)){
            resultTest.appendChild(document.querySelector('.vespertino-extremo'))
        }else  if(rs >= Number(31) && rs <= Number(41)){
            resultTest.appendChild(document.querySelector('.moderadamente-vespertino'))
        }else  if(rs >= Number(42) && rs <= Number(58)){
            resultTest.appendChild(document.querySelector('.indiferente'))
        }else  if(rs >= Number(59) && rs <= Number(69)){
            resultTest.appendChild(document.querySelector('.moderadamente-matutino'))
        }else  if(rs >= Number(70) && rs <= Number(86)){
            resultTest.appendChild(document.querySelector('.matutino-extremo'))
        }
    }

    resultButton.addEventListener('click', function(){

        resultState();

        // var reducer = (accumulator, currentValue) => accumulator + currentValue;
        // result = counter.reduce(reducer);

        // // console.log(result);


        // middleCardTeste.classList.add('card-out');
        // document.querySelector('.bh-card-ultimate').classList.add('active');

        // setTimeout(function(){
        //     document.querySelector('.wait-card').classList.remove('active');
        //     document.querySelector('.bh-card-ultimate').classList.add('slow-fadein');
        // }, 200);

        // var resultTest = document.querySelector('.ultimate-result-test');

        // var resultReference = parseInt(result, 10);

        // var rs = resultReference;

        // // if(rs >= Number(15) && rs <= Number(30)){
        // //     resultTest.innerText = 'Vespertino Extremo';
        // // }else  if(rs >= Number(31) && rs <= Number(41)){
        // //     resultTest.innerText = 'Moderadamente Vespertino';
        // // }else  if(rs >= Number(42) && rs <= Number(58)){
        // //     resultTest.innerText = 'Indiferente';
        // // }else  if(rs >= Number(59) && rs <= Number(69)){
        // //     resultTest.innerText = 'Moderadamente matutino'
        // // }else  if(rs >= Number(70) && rs <= Number(86)){
        // //     resultTest.innerText = 'Matutino extremo';
        // // }

        // if(rs >= Number(15) && rs <= Number(30)){
        //     resultTest.appendChild(document.querySelector('.vespertino-extremo'))
        // }else  if(rs >= Number(31) && rs <= Number(41)){
        //     resultTest.appendChild(document.querySelector('.moderadamente-vespertino'))
        // }else  if(rs >= Number(42) && rs <= Number(58)){
        //     resultTest.appendChild(document.querySelector('.indiferente'))
        // }else  if(rs >= Number(59) && rs <= Number(69)){
        //     resultTest.appendChild(document.querySelector('.moderadamente-matutino'))
        // }else  if(rs >= Number(70) && rs <= Number(86)){
        //     resultTest.appendChild(document.querySelector('.matutino-extremo'))
        // }

    })
    

}, false)