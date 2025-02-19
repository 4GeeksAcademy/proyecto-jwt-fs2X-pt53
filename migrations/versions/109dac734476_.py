"""empty message

Revision ID: 109dac734476
Revises: 8ec18a5b5ccb
Create Date: 2025-02-06 21:21:16.214292

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '109dac734476'
down_revision = '8ec18a5b5ccb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=250),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=250),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)

    # ### end Alembic commands ###
