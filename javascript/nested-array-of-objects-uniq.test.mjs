
import {uniqChildren} from './nested-array-of-objects-uniq.mjs'

describe('uniqChildren()', () => {
  let regions = [
    {code: 'R01', name: 'west', offices: [
        {code: 'F01', name: 'office 01'},
        {code: 'F02', name: 'office 02'},
        {code: 'F03', name: 'office 03'},
        {code: 'F04', name: ''}
      ]},
    {code: 'R02', name: 'east', offices: [
        {code: 'F03', name: 'office 03'},
        {code: 'F04', name: ''},
        {code: 'F05', name: 'office 05'},
        {code: 'F06', name: ''}
      ]},
  ];

  test('returns unique array of offices', () => {
    expect(uniqChildren(regions)).toEqual([
        { code: 'F01', name: 'office 01' },
        { code: 'F02', name: 'office 02' },
        { code: 'F03', name: 'office 03' },
        { code: 'F04', name: '' },
        { code: 'F05', name: 'office 05' },
        { code: 'F06', name: '' }
      ]);
  });
})
