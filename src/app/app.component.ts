import { Component } from '@angular/core';
import { Process } from './common/types/type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public columns: Array<string> = ['Name', 'Device', 'Path', 'Status'];
  public rows: Array<string> = ['name', 'device', 'path', 'status'];
  public data: Array<Process> = [
    {
      name: 'smss.exe',
      device: 'Stark',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
      status: 'scheduled'
    },
    {
      name: 'netsh.exe',
      device: 'Targaryen',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
      status: 'available'
    },
    {
      name: 'uxtheme.dll',
      device: 'Lannister',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
      status: 'available'
    },
    {
      name: 'cryptbase.dll',
      device: 'Martell',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
      status: 'scheduled'
    },
    {
      name: '7za.exe',
      device: 'Baratheon',
      path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
      status: 'scheduled'
    }
  ];
  public actionControlledBy: object = { key: 'status', value: 'available' };

  download(event: any): void {
    const payload = event.payload;
    let alertString = '';

    payload.forEach((item: Process) => {
      alertString += `Path: ${item.path}\nDevice: ${item.device}\n\n`;
    });

    alert(alertString);
  }
}
