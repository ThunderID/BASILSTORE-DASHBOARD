<template>
  <div>
    <b-card title="Katalog">
      <div class='card-text pt-4'>
        <TableCatalog></TableCatalog>
      </div>
    </b-card>
  </div>
</template>

<script>
import TableCatalog from '~/components/catalog/table'
export default {
  components: { TableCatalog }
}
</script>