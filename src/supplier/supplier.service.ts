import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { SupplierEntity, SupplierEntity2 } from './entity/supplier.entity';
// import { QuestionEntity } from 'src/questions/entity/question.entity';
import { CreateSupplierTypeOrmDTO } from './dtos/create-supplier.dto';
import { TitleEntity } from 'src/titles/entity/title.entity';
// import Excel from 'exceljs';
const reader = require('xlsx');
const Excel = require('exceljs');

export interface Supplier {
  name: string;
  address: string;
  phone: number;
}

export interface SupplierAll {
  data: string[];
  total: number;
}

// redirect: 4,
// Content_Questions: 'ban thích chiến dịch này không?',
// Answer_Content: 'thích',
// Campain_name: 'chien dich 1',
// button_type: 'Type option',
// sheet: 1
export interface DataExcel {
  redirect: number;
  Content_Questions: string;
  Answer_Content: string;
  Campain_name: string;
  button_type: string;
  sheet: number;
}

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplisersRepository: Repository<SupplierEntity>,
    @InjectRepository(TitleEntity)
    private titlesRepository: Repository<TitleEntity>,
    @InjectDataSource() private datasource: DataSource,
  ) {}

  async findAll(): Promise<SupplierEntity[]> {
    const result = await this.supplisersRepository.find({});
    console.log(result.length);
    return result;
  }

  async findone() {
    const supplier: Supplier = await this.supplisersRepository.findOneBy({
      id: 2,
    });
    console.log(supplier);
    return supplier;
  }

  createSupliser(supplier: SupplierEntity): Promise<SupplierEntity> {
    return this.supplisersRepository.save(supplier);
  }

  async getAll(): Promise<SupplierEntity[]> {
    // return await this.supplisersRepository.find({});
    return await this.datasource
      .getRepository(SupplierEntity)
      .createQueryBuilder('supplier')
      .leftJoinAndSelect('supplier.title', 'title')
      .getMany();
  }

  async createsuppliertypeorm(
    createSupplierTypeOrmDTO: CreateSupplierTypeOrmDTO,
  ) {
    console.log('+++++++++++++++++++++++++++++=');
    console.log(createSupplierTypeOrmDTO);
    const titles = await this.titlesRepository.findBy({
      id: In(createSupplierTypeOrmDTO.title),
    });

    if (
      titles.length != createSupplierTypeOrmDTO.title.length ||
      titles.length == 0
    ) {
      throw new NotFoundException('Some Title does not exist!');
      // console.log("Some Title does not exist!")
    } else {
      // for (const title of titles) {
      //   createSupplierTypeOrmDTO.title.push(title);
      // }
      // createSupplierTypeOrmDTO.Idtitles = []lll
      const result = await this.supplisersRepository.create(
        createSupplierTypeOrmDTO,
      );
      result.title = titles;
      await this.supplisersRepository.save(result);
      return result;
    }
  }

  async ReadfileExcel(urlfileExcel: string) {
    const path = require('path');
    const path_join = path.join('files', `${urlfileExcel}`);
    console.log(path_join);
    const file = reader.readFile(`${path_join}`);
    let data = [];

    const sheets = file.SheetNames; //[ 'Sheet1', 'Sheet2', 'Sheet3', 'Sheet4', 'Sheet5' ]
    console.log(sheets);
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]); // chuyển file sheet i sang json
      temp.forEach((res) => {
        data.push(res);
        // console.log(res[1])
      });
    }

    // Printing data
    console.log(data);
    console.log(urlfileExcel);
  }

  async WritefileExcel(response) {
    // Reading our test file
    const path = require('path');
    // const path_join = path.join('files');
    // console.log(path_join)
    // const file = reader.readFile(`./${path_join}`)
    const rowcell = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'];
    const data: DataExcel[] = [
      {
        redirect: 4,
        Content_Questions: 'ban thích chiến dịch này không?',
        Answer_Content: 'thích',
        Campain_name: 'chien dich 1',
        button_type: 'Type option',
        sheet: 1,
      },
      {
        redirect: 3,
        Content_Questions: 'ban thích chiến dịch này không?',
        Answer_Content: 'không thích',
        Campain_name: 'chien dich 1',
        button_type: 'Type option',
        sheet: 1,
      },
      {
        redirect: 5,
        Content_Questions: 'ban thích chiến dịch này không?',
        Answer_Content: 'cũng thích',
        Campain_name: 'chien dich 1',
        button_type: 'Type option',
        sheet: 1,
      },
      {
        redirect: 5,
        Content_Questions: 'bạn cảm thấy thế nào?',
        Answer_Content: 'bình thường',
        Campain_name: 'chien dich 1',
        button_type: 'Type option',
        sheet: 2,
      },
      {
        redirect: 5,
        Content_Questions: 'bạn cảm thấy thế nào?',
        Answer_Content: 'tốt',
        Campain_name: 'chien dich 1',
        button_type: 'Type option',
        sheet: 2,
      },
      {
        redirect: 5,
        Content_Questions: 'bạn cảm thấy thế nào?',
        Answer_Content: 'tạm',
        Campain_name: 'chien dich 1',
        button_type: 'Type option',
        sheet: 2,
      },
    ];
    // const ws = reader.untils.json_to_sheet(data)
    // reader.utils.book_append_sheet(file,ws,"sheet 1")

    //writing
    // reader.writeFile(file, './file/test.xlsx')
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(
      'Sheet 1',
      { properties: { tabColor: { argb: 'FFC0000' } } },
      { views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }] },
    );
    // const worksheet = workbook.addWorksheet("Sheet 1", {views:[{state: 'frozen', xSplit: 1, ySplit:1}]});
    // worksheet.views = [
    //   {state: 'frozen', xSplit: 2, ySplit: 3, topLeftCell: 'G10', activeCell: 'A1'}
    // ];

    // rowcell.map((key : any )=> {
    //   worksheet.getCell(key).fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: 'cccccc' }
    //   };
    // });

    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'cccccc' },
    };

    // worksheet.getCell('A1').font = {
    //   name: 'Arial Black',
    //   color: { argb: 'FF00FF00' },
    //   family: 2,
    //   size: 14,
    //   italic: true
    //  };

    //  worksheet.getCell('A1').fill = {
    //   type: 'pattern',
    //   pattern:'darkTrellis',
    //   fgColor:{argb:'FFFFFF00'},
    //   bgColor:{argb:'FF0000FF'}
    //  };

    worksheet.columns = [
      { key: 'redirect', header: 'redirect' },
      { key: 'Content_Questions', header: 'Content_Questions' },
      { key: 'Answer_Content', header: 'Answer_Content' },
      { key: 'Campain_name', header: 'Campain_name' },
      { key: 'button_type', header: 'button_type' },
      { key: 'sheet', header: 'sheet' },
    ];

    const getCell = [1, 3];
    data.forEach((item, index) => {
      // console.log(item.redirect)
      // console.log(index)
      worksheet.addRow(item);
      // console.log(index)
      // const row = worksheet.getRow(index);
      // console.log(row.values)
      if (item.redirect === 5 || item.Answer_Content === 'thích') {
        const row = worksheet.getRow(index + 2);
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'cccccc' },
        };
        //cell = 1 có nghĩa là cột 1 là cột redirect
        getCell.map((cell) => {
          row.getCell(cell).font = {
            name: 'Arial Black',
            color: { argb: 'FF00FF00' },
            family: 2,
            size: 14,
            italic: true,
          };
        });
      }
      // worksheet.getColumn(item.redirect).numFmt  = 5
      // worksheet.getColumn(item.redirect).alignment = {horizontal: 'center'}
      // var row = worksheet.getRow(5);
      // const a =  row.getCell(1).value
      // console.log(a)
      // const a= worksheet.getCell(index)
      // console.log(a)
      // worksheet.addRow(item)
    });

    const exportpath = path.join('files', 'datatest.xlsx');
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'datatest.xlsx',
    );
    await workbook.xlsx.write(response).then(function () {
      response.end();
    });
    // return resultfile
  }
}
