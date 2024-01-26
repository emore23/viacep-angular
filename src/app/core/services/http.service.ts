import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeProps } from 'src/app/shared/models/code.model';
import { HistoryProps } from 'src/app/shared/models/history.model';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable()
export class HttpService {
  apiEndpoint: string = 'https://viacep.com.br/ws/$cep/json';
  historyToken: string = environment.historyToken;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  public search(cep: string): Observable<CodeProps> {
    return this.httpClient.get<CodeProps>(
      this.apiEndpoint.replace('$cep', cep)
    );
  }

  public handleSearch(cep: string): Observable<CodeProps> {
    return this.search(cep);
  }

  public processSearchResult(cep: string, data: CodeProps): void {
    if (data.erro) {
      console.error(`Error occurred for CEP: ${cep}`);
    } else {
      this.postHistory(cep, false);
    }
  }

  public postHistory(cep: string, erro: boolean): void {
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
      }
    }
  }

  public fetchHistory(): HistoryProps[] {
    return this.getHistory();
  }

  public clearHistoryFetch(): void {
    this.storageService.removeItem(this.historyToken);
  }

  private getHistory(): HistoryProps[] {
    return this.storageService.getItem<HistoryProps[]>(this.historyToken) || [];
  }

  private setHistory(history: HistoryProps[]): void {
    this.storageService.setItem(this.historyToken, history);
  }
}
