export const insertData = `INSERT INTO MonHoc 
            (
                MSSV, hoTen, ngaysinh, lop, maLMH, tenMH, nhom, soTC, ghichu
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`