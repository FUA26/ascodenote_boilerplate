# Data Table Component

Komponen Data Table yang dapat digunakan kembali menggunakan `@tanstack/react-table` dengan Shadcn UI.

## Fitur

- ✅ **Sorting** - Klik header kolom untuk sorting ascending/descending
- ✅ **Filtering** - Search/filter data secara global atau per kolom
- ✅ **Pagination** - Navigasi halaman dengan kontrol page size
- ✅ **Row Selection** - Pilih baris individual atau select all
- ✅ **Column Visibility** - Toggle visibility kolom melalui dropdown "View"
- ✅ **Responsive Design** - Tampilan yang menyesuaikan dengan ukuran layar

## Struktur File

### Core Components

```
components/data-table/
├── data-table.tsx                 # Komponen utama DataTable
├── data-table-column-header.tsx   # Header kolom dengan sorting
├── data-table-pagination.tsx      # Kontrol pagination
├── data-table-toolbar.tsx         # Toolbar dengan search & view options
└── data-table-view-options.tsx    # Dropdown untuk toggle kolom
```

### Example Implementation

```
app/(backoffice)/examples/table/
├── page.tsx              # Demo page
└── data/
    ├── schema.ts         # Zod schema untuk data
    └── seed.ts           # Mock data generator
```

## Cara Penggunaan

### 1. Import Components

```tsx
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { type ColumnDef } from "@tanstack/react-table";
```

### 2. Define Columns

```tsx
const columns: ColumnDef<YourDataType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  // ... kolom lainnya
];
```

### 3. Render DataTable

```tsx
<DataTable
  columns={columns}
  data={yourData}
  searchKey="name"
  searchPlaceholder="Search by name..."
/>
```

## Props

### DataTable Props

| Prop                | Type                         | Default       | Description                      |
| ------------------- | ---------------------------- | ------------- | -------------------------------- |
| `columns`           | `ColumnDef<TData, TValue>[]` | Required      | Definisi kolom untuk table       |
| `data`              | `TData[]`                    | Required      | Array data yang akan ditampilkan |
| `searchKey`         | `string`                     | `"name"`      | Key untuk global search filter   |
| `searchPlaceholder` | `string`                     | `"Search..."` | Placeholder untuk search input   |

### DataTableColumnHeader Props

| Prop        | Type                    | Description                    |
| ----------- | ----------------------- | ------------------------------ |
| `column`    | `Column<TData, TValue>` | Column object dari react-table |
| `title`     | `string`                | Judul kolom                    |
| `className` | `string` (optional)     | Custom CSS classes             |

## Contoh Demo

Lihat implementasi lengkap di `/examples/table` yang menampilkan:

- 50+ task records dengan berbagai status dan prioritas
- Filtering berdasarkan title
- Sorting untuk semua kolom
- Pagination dengan page size options
- Column visibility toggle
- Row selection dengan checkbox

## Dependencies

- `@tanstack/react-table` - Table state management
- `@radix-ui/react-icons` - Icons untuk UI controls
- `date-fns` - Date formatting
- Shadcn UI components (Badge, Button, Checkbox, Input, Select, dll)

## Tips

1. **Custom Cell Rendering**: Gunakan property `cell` untuk custom render cell content
2. **Filter Functions**: Tambahkan `filterFn` untuk custom filtering logic
3. **Disable Sorting**: Set `enableSorting: false` untuk kolom yang tidak perlu sorting
4. **Hide Columns**: Set `enableHiding: false` untuk kolom yang tidak boleh disembunyikan

## Server-Side Integration

Untuk implementasi server-side (API pagination, sorting, filtering):

1. Replace `getPaginationRowModel()` dengan manual pagination state
2. Handle sorting state dan kirim ke API
3. Handle filter state dan kirim ke API
4. Update data berdasarkan response dari API

```tsx
const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
const [sorting, setSorting] = useState([]);

// Fetch data dengan pagination & sorting
const { data, totalCount } = useFetchData({ pagination, sorting });

// Configure table dengan manual pagination
const table = useReactTable({
  data,
  columns,
  pageCount: Math.ceil(totalCount / pagination.pageSize),
  state: { pagination, sorting },
  onPaginationChange: setPagination,
  onSortingChange: setSorting,
  manualPagination: true,
  manualSorting: true,
});
```
