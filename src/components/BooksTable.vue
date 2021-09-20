<template>
  <section
    v-if="bookList.length"
    class="books"
  >
    <book-filter
      class="books__filters"
      @change="onFilterChange"
    />
    <table class="books__table">
      <tr>
        <th
          v-for="({ label, value, width }) in columnList"
          :key="`header-${value}`"
          :class="booksTableHeaderClassList(value)"
          :width="width"
        >
          {{ label }}
        </th>
      </tr>
      <tr
        v-for="book in bookListFiltered"
        :key="book.id"
      >
        <td
          v-for="({ value }) in columnList"
          :key="`cell-${value}`"
          :class="booksTableCellClassList(value)"
        >
          {{ formatBookData(book[value], value) }}
        </td>
      </tr>
    </table>
  </section>
  <h1 v-else>Loading...</h1>
</template>

<script>
import { mapActions } from 'vuex'

import formatNumberIfZeroNeeded from '../utils/formatNumberIfZeroNeeded'

import BookFilter from './BookFilter.vue'

export default {
  name: 'App',
  components: {
    BookFilter
  },
  data () {
    return {
      columnList: [
        {
          label: 'Title',
          value: 'title',
          width: '15%'
        },
        {
          label: 'Description',
          value: 'description'
        },
        {
          label: 'Publish date',
          value: 'publishDate',
          width: '15%'
        }
      ],
      bookList: [],
      bookListFiltered: []
    }
  },
  methods: {
    ...mapActions({
      fetchBooks: 'fetchBooks'
    }),
    booksTableHeaderClassList (column) {
      return [
        'table__th',
        `table__th_${column}`
      ]
    },
    booksTableCellClassList (column) {
      return [
        'table__td',
        `table__td_${column}`
      ]
    },
    formatBookData (bookData, value) {
      if (value === 'publishDate') {
        const date = new Date(bookData)
        const day = formatNumberIfZeroNeeded(date.getDate())
        const month = formatNumberIfZeroNeeded(date.getMonth() + 1)
        const year = date.getFullYear()

        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${day}.${month}.${year} ${hours}:${minutes}`
      } else return bookData
    },
    onFilterChange (filters) {
      Object.keys(filters).forEach(filterKey => {
        if (filters[filterKey].value) {
          this.bookListFiltered = this.bookList.filter(bookData => {
            const formattedBookData = this.formatBookData(bookData[filterKey], filterKey).toLowerCase()
            const formattedFilterData = filters[filterKey].value.toLowerCase()
            return formattedBookData.includes(formattedFilterData)
          })
        }
      })
    }
  },
  async created () {
    this.bookList = await this.fetchBooks()
    this.bookListFiltered = this.bookList
  }
}
</script>

<style scoped lang="scss">
$borderColor: rgb(50, 50, 50);
.books {
  &__filters {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-bottom: 24px;
  }

  &__table {

    width: 100%;
    border-collapse: collapse;
    border: 1px solid $borderColor;
  }
}
.table {
  &__th,
  &__td {
    border: 1px solid $borderColor;
  }

  &__th {
    padding: 16px;
  }

  &__td {
    padding: 8px 16px;

    &_description {
      text-align: left;
    }
  }
}
</style>
