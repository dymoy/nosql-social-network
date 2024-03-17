/** 
 * @file format_date.test.js
 * Testing suit for format_date.js 
 */
const format_date = require('../utils/helpers/format_date');
const dayjs = require('dayjs');

describe('format_date', () => {
    describe('-th', () => {
        it('should add -th suffix to the day', () => {
            const timestamp = new Date('December 17, 1995 03:24:00');
            expect(format_date(timestamp)).toEqual('Dec 17th, 1995 at 03:24');
        });

        it('should add -th suffix to the day', () => {
            const timestamp = new Date('December 13, 2005 13:24:00');
            expect(format_date(timestamp)).toEqual('Dec 13th, 2005 at 13:24');
        })
    });

    describe('-st', () => {
        it('should add -st suffix to the day', () => {
            const timestamp = new Date('January 1, 2005 13:24:00');
            expect(format_date(timestamp)).toEqual('Jan 1st, 2005 at 13:24');
        });
    });

    describe('-nd', () => {
        it('should add -nd suffix to the day', () => {
            const timestamp = new Date('July 22, 2013 15:34:00');
            expect(format_date(timestamp)).toEqual('Jul 22nd, 2013 at 15:34');
        });
    });

    describe('-rd', () => {
        it('should add -rd suffix to the day', () => {
            const timestamp = new Date('December 3, 2022 13:24:00');
            expect(format_date(timestamp)).toEqual('Dec 3rd, 2022 at 13:24');
        })
    })
});
