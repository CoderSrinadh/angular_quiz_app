import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, fromEvent, interval, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular_practise_projects';
  public questions = [
    {
      id: 1,
      name: 'What is JS?',
      answers: [
        'JS is a dynamic language',
        'JS is an interpreted language',
        'JS is an OOP-based language',
        'JS is a good language',
      ],
      correct: 'JS is a dynamic language',
    },
    {
      id: 2,
      name: 'Which of the following is a JavaScript data type?',
      answers: ['String', 'Integer', 'Float', 'Character'],
      correct: 'String',
    },
    {
      id: 3,
      name: "What is the purpose of the 'this' keyword in JavaScript?",
      answers: [
        'Refers to the global object',
        'Refers to the current function',
        'Refers to the calling object',
        'All of the above',
      ],
      correct: 'All of the above',
    },
    {
      id: 4,
      name: 'Which of the following is a correct way to create a JavaScript object?',
      answers: [
        "let obj = {name: 'John'}",
        'let obj = new Object()',
        'let obj = Object()',
        'All of the above',
      ],
      correct: 'All of the above',
    },
    {
      id: 5,
      name: 'Which of the following is used to declare a constant in JavaScript?',
      answers: ['const', 'let', 'var', 'final'],
      correct: 'const',
    },
    {
      id: 6,
      name: 'Which method is used to parse a JSON string in JavaScript?',
      answers: [
        'JSON.parse()',
        'JSON.stringify()',
        'JSON.convert()',
        'parseJSON()',
      ],
      correct: 'JSON.stringify()',
    },
  ];
  public progress__value: number = 0;
  public Question__Data: any[] = this.questions;
  public buttonDisabled: boolean = false;
  public marksObtained = signal<number>(0);
  public index = signal<number>(-1);
  public CorrectQuestion = false;
  public CorrectOption: any = 'none';
  public indexData: number = 0;
  public stopShow: boolean = false;
  public login: FormGroup = new FormGroup({
    nameD:new FormControl('')
  });
  public ngOnInit(): void {
    this.Question__Data = [this.questions[0]];  }
  public ValidationQuestion(qustionOption: any): void {
    if (qustionOption) {
      let data = this.questions.find((ele, index) => {
        this.indexData = index;
        return ele.correct === qustionOption;
      });
      if (data) {
        this.marksObtained.update(
          (marks) => marks + 100 / (this.questions.length - 1)
        );
        this.CorrectQuestion = true;
        this.CorrectOption = data.correct;
      } else {
        this.marksObtained.update((marks) => marks);
        this.CorrectOption = null;
      }
    }
  }

  public nextQuestion(): void {
    this.index.update((val) => val + 1);
    if (this.index() < this.questions.length) {
      this.Question__Data = [this.questions[this.index()]];
      this.progress__value = this.progress__value + 100 / 6;
    } else {
      console.log(Math.floor(this.marksObtained()));
      this.buttonDisabled = true;
      this.stopShow = true;
    }
  }
}
