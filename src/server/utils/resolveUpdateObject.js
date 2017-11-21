import joinMonster from 'join-monster';
import knex from 'server/utils/db';
import hasEmptyArgs from 'server/utils/emptyArgs';
import forArgsUpdate from 'server/utils/forArgsUpdate';

export default (schema, parent, args, context, resolveInfo) => new Promise((resolve) => {
  if (!hasEmptyArgs(args.input.patch)) {
    let updateQuery = knex(schema._typeConfig.sqlTable).where(schema._typeConfig.uniqueKey, '=', args.input.id);
    updateQuery = forArgsUpdate(updateQuery, args.input.patch);
    updateQuery.then(() => resolve(joinMonster(resolveInfo, {}, sql => knex.raw(sql))));
  } else {
    resolve(joinMonster(resolveInfo, {}, sql => knex.raw(sql)));
  }
});
