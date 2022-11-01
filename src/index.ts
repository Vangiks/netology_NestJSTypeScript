import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import config from '../config';

const btnGitHub = document.getElementById('btn-github');
const btnGitLab = document.getElementById('btn-gitlab');
const inputText = document.getElementById('text') as HTMLButtonElement;

const fetch = (url: string) =>
  ajax.getJSON(url).subscribe((value) => console.log('data$ value', value));

fromEvent(btnGitHub, 'click').subscribe(() =>
  fetch(config.urlApiGitHub + `/search/repositories?q=${inputText.value}`)
);
fromEvent(btnGitLab, 'click').subscribe(() =>
  fetch(config.urlGitLab + `/projects?search=${inputText.value}`)
);
