import { Injectable } from '@nestjs/common';
import {firstValueFrom, merge, toArray, from, map, mergeAll, take, Observable} from 'rxjs'
import axios from 'axios';

@Injectable()
export class RxjsService {
    private readonly githubURL = 'https://api.github.com/search/repositories?q=';
    private readonly gitlabURL = 'https://gitlab.com/api/v4/projects?search=';

    private getGithub(text: string, count: number): Observable<any> {
        return from(axios.get(`${this.githubURL}${text}`))
            .pipe(map((res: any) => res.data.items), mergeAll())
            .pipe(take(count));
    }

    private getGitlab(text: string, count: number): Observable<any> {
        return from(axios.get(`${this.gitlabURL}${text}`))
        .pipe(map((res: any) => res.data.items), mergeAll())
        .pipe(take(count));
    }

    async searchRepositories(text: string): Promise<any> {
        const data$ = merge(this.getGithub(text, 10), this.getGitlab(text, 10))
            .pipe(toArray());
        data$.subscribe(() => {});
        return await firstValueFrom(data$);
    }
}
