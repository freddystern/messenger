import { Injectable } from '@angular/core';
import { Entry, File } from '@awesome-cordova-plugins/file/ngx';
import { Directory, Filesystem, MkdirOptions } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { inheritAttributes } from 'ionicons/dist/types/components/icon/utils';
import { FileSystemService } from './file-system.service';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private file: File, private platform: Platform) { 
  }



  public async copy(options: {
    from: string,
    to: string,
    fromDirectory: string,
    toRelativeDirectory?: string
  }): Promise<Entry>{

    if(!options.toRelativeDirectory)
      options.toRelativeDirectory = '';
    options.fromDirectory = this.convertToNativeUrl(options.fromDirectory);

    const uri = (await Filesystem.getUri({path: options.toRelativeDirectory, directory: Directory.Documents})).uri;
    const file = await this.file.copyFile(options.fromDirectory, options.from, uri, options.to);

    return await file;
  }

  public convertToNativeUrl(path: string){
    if(this.platform.is('ios')){
      if(path.substring(0, 7) != 'file://')
        path = 'file://' + path;
    }
    return path;
  }

}
