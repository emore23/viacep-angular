import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeProps } from 'src/app/shared/models/code.model';
import { HistoryProps } from 'src/app/shared/models/history.model';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/services/storage.service';
import { Subject } from 'rxjs';

@Injectable()
export class HttpService {
  apiEndpoint: string = 'https://viacep.com.br/ws/$cep/json';
  historyToken: string = environment.historyToken;

  private historySubject = new Subject<void>();

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  search(cep: string): Observable<CodeProps> {
    return this.httpClient.get<CodeProps>(
      this.apiEndpoint.replace('$cep', cep)
    );
  }

  handleSearch(cep: string): Observable<CodeProps> {
    return this.search(cep);
  }

  processSearchResult(cep: string, data: CodeProps): void {
    if (data.erro) {
      console.error(`Error occurred for CEP: ${cep}`);
    } else {
      this.postHistory(cep, false);
    }
  }

  postHistory(cep: string, erro: boolean): void {
    if (!erro) {
      let currentHistory: HistoryProps[] = this.getHistory();

      const cepAlreadyExist = currentHistory.some((item) => item.cep === cep);

      if (!cepAlreadyExist) {
        currentHistory.push({
          cep: cep,
          data: new Date().toJSON(),
          erro: erro,
        });

        this.setHistory(currentHistory);
        this.historySubject.next();
      }
    }
  }

  fetchHistory(): HistoryProps[] {
    return this.getHistory();
  }

  clearHistoryFetch(): void {
    this.storageService.removeItem(this.historyToken);
    this.historySubject.next();
  }

  private getHistory(): HistoryProps[] {
    return (
      this.storageService.getItem<HistoryProps[]>(this.historyToken) || []
    );
  }

  private setHistory(history: HistoryProps[]): void {
    this.storageService.setItem(this.historyToken, history);
  }

  getHistorySubject(): Subject<void> {
    return this.historySubject;
  }
}
