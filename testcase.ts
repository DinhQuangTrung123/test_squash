// import { Test, TestingModule } from '@nestjs/testing';
// import { FilterCdcEventService } from './filter-cdc-event.service';
// import { FilterConfigCacheRepositoryName } from 'src/shared/domain/repository/filter-config.repository.interface';
// import { FilterLogRepositoryName } from 'src/shared/domain/repository/filter-log.repository.interface';
// import { ConfigService } from '@nestjs/config';
// import { KafkaContext } from '@nestjs/microservices';
// import { KafkaMessage, Producer } from 'kafkajs';
// import { Consumer } from '@nestjs/microservices/external/kafka.interface';
// import { FilterConfig, FilterLog } from 'src/shared/domain/entity';
// import { FilterLogState } from 'src/shared/domain/model/enum/filter-log-state.enum';

// const args = [
//   'test',
//   { test: true },
//   undefined,
//   { test: 'consumer' },
//   () => {}, // eslint-disable-line
//   { test: 'producer' },
// ];
// const context = new KafkaContext(args as [KafkaMessage, number, string, Consumer, () => Promise<void>, Producer]);
// const dataConfig = [
//   new FilterConfig({
//     tableName: 'BKG_BOOKING',
//     columnName: 'BKG_STS_CD',
//     targetName: 'Booking',
//     updatedAt: new Date(),
//     createdAt: new Date(),
//     isValid: true,
//   }),
//   new FilterConfig({
//     tableName: 'BKG_BOOKING',
//     columnName: 'RQST_DT',
//     targetName: 'Container',
//     updatedAt: new Date(),
//     createdAt: new Date(),
//     isValid: true,
//   }),
// ];
// const filterLog = new FilterLog({
//   parentId: 'fjkdjfkdf',
//   receiveTopic: context.getTopic(),
//   receiveData: {},
//   state: FilterLogState.NEW,
//   changedColumns: null,
//   createdTime: new Date(),
//   updatedTime: new Date(),
// });

// describe(`${FilterCdcEventService.name}`, () => {
//   let service: FilterCdcEventService;
//   const mockCdcEventEmit = jest.fn();
//   const mockGetAllValid = jest.fn();
//   const type = FilterCdcEventService.prototype;
//   beforeEach(async () => {
//     mockCdcEventEmit.mockReset();
//     mockCdcEventEmit.mockImplementation();
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         FilterCdcEventService,
//         {
//           provide: FilterConfigCacheRepositoryName,
//           useFactory: () => ({
//             getAllValid: mockGetAllValid,
//           }),
//         },
//         {
//           provide: FilterLogRepositoryName,
//           useFactory: () => ({
//             save: jest.fn().mockResolvedValue(filterLog),
//             update: jest.fn().mockReturnValue(true),
//           }),
//         },
//         {
//           provide: 'KAFKA_DEFAULT_CLIENT',
//           useFactory: () => ({
//             emit: mockCdcEventEmit,
//           }),
//         },
//         ConfigService,
//       ],
//     }).compile();

//     service = module.get<FilterCdcEventService>(FilterCdcEventService);
//   });

//   it(`${type.execute.name}_Should_Sent_Topic_Distributed_When_DataInsertCorrect`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);
//     const payloadInsert = {
//       metadata: {
//         TableID: 22,
//         TableName: 'OPUSADM.BKG_BOOKING',
//         TxnID: '0.2.7.99753867',
//         OperationName: 'INSERT',
//         FileName: 'pa000001073',
//         FileOffset: 126913760,
//         TimeStamp: '2022-06-13T09:13:02.976+08:00',
//         'Oracle ROWID': 'AAAz01AIxAADJJTAAD',
//         CSN: '16162847945778',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {
//         BKG_NO: 'SINC23781500',
//         BL_NO: 'SINC23781500',
//         BL_NO_TP: '0',
//         BL_TP_CD: null,
//         BKG_STS_CD: 'F',
//         BKG_CGO_TP_CD: 'F',
//         SLAN_CD: 'AG3',
//         SVC_SCP_CD: 'IAA',
//       },
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     await service.execute('OPS-SCE01_T_EDH_SCE01', context, payloadInsert);

//     expect(mockCdcEventEmit.mock.calls).toHaveLength(1);
//   });

//   it(`${type.execute.name}_Should_ThrowValidateException_EventHaveNoChangeColumn`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);
//     const payloadUpdateNotPass = {
//       metadata: {
//         TableID: 49,
//         TableName: 'OPUSADM.BKG_BOOKING',
//         TxnID: '0.91.8.93519717',
//         OperationName: 'UPDATE',
//         FileName: 'pa000001198',
//         FileOffset: 372229171,
//         TimeStamp: '2022-06-21T13:32:27.998+08:00',
//         'Oracle ROWID': 'AAAz01AIMAAFyPNAAC',
//         CSN: '16163008747293',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {
//         BKG_NO: 'NK2GF0402800',
//         SLAN_CD: 'CM2',
//         VSL_CD: 'SCRT',
//         SKD_VOY_NO: '0026',
//         SKD_DIR_CD: 'S',
//         POR_CD: 'CNNKG',
//         BKG_STS_CD: 'F',
//       },
//       before: {
//         BKG_NO: 'NK2GF0402800',
//         SLAN_CD: 'CM2',
//         VSL_CD: 'SCRT',
//         SKD_VOY_NO: '0026',
//         SKD_DIR_CD: 'S',
//         POR_CD: 'CNNKG',
//         BKG_STS_CD: 'F',
//       },
//       userdata: { current_time: '2022-06-21T13:32:28.775+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute('OPS-SCE01_T_EDH_SCE01', context, payloadUpdateNotPass);

//     await expect(result).rejects.toThrow('Event have no change column');
//   });
//   it(`${type.execute.name}_Should_Sent_Topic_Distributed_When_PayloadUpdateCorrect`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);

//     const payloadUpdatePass = {
//       metadata: {
//         TableID: 49,
//         TableName: 'OPUSADM.BKG_BOOKING',
//         TxnID: '0.91.8.93519717',
//         OperationName: 'UPDATE',
//         FileName: 'pa000001198',
//         FileOffset: 372229171,
//         TimeStamp: '2022-06-21T13:32:27.998+08:00',
//         'Oracle ROWID': 'AAAz01AIMAAFyPNAAC',
//         CSN: '16163008747293',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {
//         BKG_NO: 'NK2GF0402800',
//         SLAN_CD: 'CM2',
//         VSL_CD: 'SCRT',
//         SKD_VOY_NO: '0026',
//         SKD_DIR_CD: 'S',
//         POR_CD: 'CNNKG',
//         BKG_STS_CD: 'F',
//       },
//       before: {
//         BKG_NO: 'NK2GF0402800',
//         SLAN_CD: 'CM2',
//         VSL_CD: 'SCRT',
//         SKD_VOY_NO: '0026',
//         SKD_DIR_CD: 'M',
//         POR_CD: 'CNNKG',
//         BKG_STS_CD: 'M',
//       },
//       userdata: { current_time: '2022-06-21T13:32:28.775+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     await service.execute('OPS-SCE01_T_EDH_SCE01', context, payloadUpdatePass);

//     expect(mockCdcEventEmit.mock.calls).toHaveLength(1);
//   });

//   it(`${type.execute.name}_Should_ThrowValidateException_TableNameIsEmpty`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);

//     const payloadInsert = {
//       metadata: {
//         TableID: 22,
//         TableName: '',
//         TxnID: '0.2.7.99753867',
//         OperationName: 'INSERT',
//         FileName: 'pa000001073',
//         FileOffset: 126913760,
//         TimeStamp: '2022-06-13T09:13:02.976+08:00',
//         'Oracle ROWID': 'AAAz01AIxAADJJTAAD',
//         CSN: '16162847945778',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {
//         BKG_NO: 'SINC23781500',
//         BL_NO: 'SINC23781500',
//         BL_NO_TP: '0',
//         BL_TP_CD: null,
//         BKG_STS_CD: 'F',
//         BKG_CGO_TP_CD: 'F',
//         SLAN_CD: 'AG3',
//         SVC_SCP_CD: 'IAA',
//       },
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute('11111111111', context, payloadInsert);

//     await expect(result).rejects.toThrow('TableName is null or empty');
//   });
//   it(`${type.execute.name}_Should_ThrowValidateException_MetaDataIsNull`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);

//     const payloadInsert = {
//       metadata: null,
//       data: {
//         BKG_NO: 'SINC23781500',
//         BL_NO: 'SINC23781500',
//         BL_NO_TP: '0',
//         BL_TP_CD: null,
//         BKG_STS_CD: 'F',
//         BKG_CGO_TP_CD: 'F',
//         SLAN_CD: 'AG3',
//         SVC_SCP_CD: 'IAA',
//       },
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute('11111111111', context, payloadInsert);

//     await expect(result).rejects.toThrow('MetaData is null');
//   });
//   it(`${type.execute.name}_Should_ThrowValidateException_TableNameIsNull`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);

//     const payloadInsert = {
//       metadata: {
//         TableID: 22,
//         TableName: null,
//         TxnID: '0.2.7.99753867',
//         OperationName: 'INSERT',
//         FileName: 'pa000001073',
//         FileOffset: 126913760,
//         TimeStamp: '2022-06-13T09:13:02.976+08:00',
//         'Oracle ROWID': 'AAAz01AIxAADJJTAAD',
//         CSN: '16162847945778',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {
//         BKG_NO: 'SINC23781500',
//         BL_NO: 'SINC23781500',
//         BL_NO_TP: '0',
//         BL_TP_CD: null,
//         BKG_STS_CD: 'F',
//         BKG_CGO_TP_CD: 'F',
//         SLAN_CD: 'AG3',
//         SVC_SCP_CD: 'IAA',
//       },
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute('11111111111', context, payloadInsert);

//     await expect(result).rejects.toThrow('TableName is null or empty');
//   });

//   it(`${type.execute.name}_Should_ThrowValidateException_PayloadDataIsNull`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);

//     const payloadInsert = {
//       metadata: {
//         TableID: 22,
//         TableName: 'OPUSADM.BKG_BOOKING',
//         TxnID: '0.2.7.99753867',
//         OperationName: 'INSERT',
//         FileName: 'pa000001073',
//         FileOffset: 126913760,
//         TimeStamp: '2022-06-13T09:13:02.976+08:00',
//         'Oracle ROWID': 'AAAz01AIxAADJJTAAD',
//         CSN: '16162847945778',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: null,
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute('11111111111', context, payloadInsert);

//     await expect(result).rejects.toThrow('Payload data is null or empty');
//   });
//   it(`${type.execute.name}_Should_ThrowValidateException_PayloadDataIsEmpty`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);

//     const payloadInsert = {
//       metadata: {
//         TableID: 22,
//         TableName: 'OPUSADM.BKG_BOOKING',
//         TxnID: '0.2.7.99753867',
//         OperationName: 'INSERT',
//         FileName: 'pa000001073',
//         FileOffset: 126913760,
//         TimeStamp: '2022-06-13T09:13:02.976+08:00',
//         'Oracle ROWID': 'AAAz01AIxAADJJTAAD',
//         CSN: '16162847945778',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {},
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute('11111111111', context, payloadInsert);

//     await expect(result).rejects.toThrow('Payload data is null or empty');
//   });

//   it(`${type.execute.name}_Should_ThrowValidateException_EventNotMatchTable`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);

//     const payloadInsert = {
//       metadata: {
//         TableID: 22,
//         TableName: 'hhhh',
//         TxnID: '0.2.7.99753867',
//         OperationName: 'INSERT',
//         FileName: 'pa000001073',
//         FileOffset: 126913760,
//         TimeStamp: '2022-06-13T09:13:02.976+08:00',
//         'Oracle ROWID': 'AAAz01AIxAADJJTAAD',
//         CSN: '16162847945778',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {
//         BKG_NO: 'SINC23781500',
//         BL_NO: 'SINC23781500',
//         BL_NO_TP: '0',
//         BL_TP_CD: null,
//         BKG_STS_CD: 'F',
//         BKG_CGO_TP_CD: 'F',
//         SLAN_CD: 'AG3',
//         SVC_SCP_CD: 'IAA',
//       },
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute('11111111111', context, payloadInsert);

//     await expect(result).rejects.toThrow('Event not match table');
//   });

//   it(`${type.execute.name}_Should_ThrowValidateException_GetFilterConfigFailed`, async () => {
//     const dataConfigEmpty = [];
//     mockGetAllValid.mockReturnValue(dataConfigEmpty);

//     const payloadInsert = {
//       metadata: {
//         TableID: 22,
//         TableName: 'OPUSADM.BKG_BOOKING',
//         TxnID: '0.2.7.99753867',
//         OperationName: 'INSERT',
//         FileName: 'pa000001073',
//         FileOffset: 126913760,
//         TimeStamp: '2022-06-13T09:13:02.976+08:00',
//         'Oracle ROWID': 'AAAz01AIxAADJJTAAD',
//         CSN: '16162847945778',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {
//         BKG_NO: 'SINC23781500',
//         BL_NO: 'SINC23781500',
//         BL_NO_TP: '0',
//         BL_TP_CD: null,
//         BKG_STS_CD: 'F',
//         BKG_CGO_TP_CD: 'F',
//         SLAN_CD: 'AG3',
//         SVC_SCP_CD: 'IAA',
//       },
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute('11111111111', context, payloadInsert);

//     await expect(result).rejects.toThrow('Get filter config failed');
//   });

//   it(`${type.execute.name}_Should_ThrowValidateException_When_ParentIDIsNull`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);

//     const payloadInsert = {
//       metadata: {
//         TableID: 22,
//         TableName: 'OPUSADM.BKG_BOOKING',
//         TxnID: '0.2.7.99753867',
//         OperationName: 'INSERT',
//         FileName: 'pa000001073',
//         FileOffset: 126913760,
//         TimeStamp: '2022-06-13T09:13:02.976+08:00',
//         'Oracle ROWID': 'AAAz01AIxAADJJTAAD',
//         CSN: '16162847945778',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {
//         BKG_NO: 'SINC23781500',
//         BL_NO: 'SINC23781500',
//         BL_NO_TP: '0',
//         BL_TP_CD: null,
//         BKG_STS_CD: 'F',
//         BKG_CGO_TP_CD: 'F',
//         SLAN_CD: 'AG3',
//         SVC_SCP_CD: 'IAA',
//       },
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute(null, context, payloadInsert);

//     await expect(result).rejects.toThrow('ParentID is null');
//   });
//   it(`${type.execute.name}_Should_ThrowValidateException_EventHaveNoColumnMatch`, async () => {
//     mockGetAllValid.mockReturnValue(dataConfig);

//     const payloadInsert = {
//       metadata: {
//         TableID: 22,
//         TableName: 'OPUSADM.BKG_BOOKING',
//         TxnID: '0.2.7.99753867',
//         OperationName: 'INSERT',
//         FileName: 'pa000001073',
//         FileOffset: 126913760,
//         TimeStamp: '2022-06-13T09:13:02.976+08:00',
//         'Oracle ROWID': 'AAAz01AIxAADJJTAAD',
//         CSN: '16162847945778',
//         RecordStatus: 'VALID_RECORD',
//       },
//       data: {
//         BKG_NO: 'SINC23781500',
//       },
//       before: null,
//       userdata: { current_time: '2022-06-17T11:34:18.666+08:00' },
//       __striimmetadata: {
//         position: null,
//       },
//     };
//     const result = service.execute('1111', context, payloadInsert);

//     await expect(result).rejects.toThrow('Event have no column match');
//   });
// });
