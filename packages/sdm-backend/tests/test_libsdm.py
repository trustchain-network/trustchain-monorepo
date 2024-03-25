# pylint: disable=line-too-long, invalid-name

"""
This code was implemented based on the examples provided in:
* AN12196: NTAG 424 DNA and NTAG 424 DNA TagTamper features and hints
"""

import binascii

import config
from libsdm.derive import derive_tag_key, derive_undiversified_key
from libsdm.sdm import (
    EncMode,
    InvalidMessage,
    ParamMode,
    decrypt_sun_message,
    validate_plain_sun,
)


def test_sun1():
    # From AN12196 page 12
    # https://ntag.nxp.com/424?e=EF963FF7828658A599F3041510671E88&c=94EED9EE65337086
    res = decrypt_sun_message(
        param_mode=ParamMode.SEPARATED,
        sdm_meta_read_key=binascii.unhexlify('00000000000000000000000000000000'),
        sdm_file_read_key=lambda _: binascii.unhexlify('00000000000000000000000000000000'),
        picc_enc_data=binascii.unhexlify("EF963FF7828658A599F3041510671E88"),
        sdmmac=binascii.unhexlify("94EED9EE65337086"))

    assert res['picc_data_tag'] == b"\xc7"
    assert res['uid'] == b"\x04\xde\x5f\x1e\xac\xc0\x40"
    assert res['read_ctr'] == 61
    assert res['file_data'] is None
    assert res['encryption_mode'] == EncMode.AES


def test_sun2():
    # FROM AN12196 page 18
    # https://www.my424dna.com/?picc_data=FD91EC264309878BE6345CBE53BADF40&enc=CEE9A53E3E463EF1F459635736738962&cmac=ECC1E7F6C6C73BF6
    original_sdmmac_param = config.SDMMAC_PARAM
    config.SDMMAC_PARAM = "cmac"
    res = decrypt_sun_message(
        param_mode=ParamMode.SEPARATED,
        sdm_meta_read_key=binascii.unhexlify('00000000000000000000000000000000'),
        sdm_file_read_key=lambda _: binascii.unhexlify('00000000000000000000000000000000'),
        picc_enc_data=binascii.unhexlify("FD91EC264309878BE6345CBE53BADF40"),
        sdmmac=binascii.unhexlify("ECC1E7F6C6C73BF6"),
        enc_file_data=binascii.unhexlify("CEE9A53E3E463EF1F459635736738962"))
    config.SDMMAC_PARAM = original_sdmmac_param

    assert res['picc_data_tag'] == b'\xc7'
    assert res['uid'] == b'\x04\x95\x8C\xAA\x5C\x5E\x80'
    assert res['read_ctr'] == 8
    assert res['file_data'] == b'xxxxxxxxxxxxxxxx'
    assert res['encryption_mode'] == EncMode.AES


def test_sun3_custom():
    original_sdmmac_param = config.SDMMAC_PARAM
    config.SDMMAC_PARAM = ""
    res = decrypt_sun_message(
        param_mode=ParamMode.SEPARATED,
        sdm_meta_read_key=binascii.unhexlify('42aff114f2cb3b6141be6dc95dfc5416'),
        sdm_file_read_key=lambda _: binascii.unhexlify('b62a9baf092439bd43c62aee96b970c5'),
        picc_enc_data=binascii.unhexlify('8ACADDEF0A9B62CDAE39A16B83FC14DE'),
        sdmmac=binascii.unhexlify('238B2543A8DEBAD8'),
        enc_file_data=binascii.unhexlify('B8436E11F627BB7F543FCC0C1E0D1A89'))
    config.SDMMAC_PARAM = original_sdmmac_param

    assert res['picc_data_tag'] == b'\xc7'
    assert res['uid'] == binascii.unhexlify('041d3c8a2d6b80')
    assert res['read_ctr'] == 291
    assert res['file_data'] == binascii.unhexlify('4e545858716e6f5f6f42467077792d56')
    assert res['encryption_mode'] == EncMode.AES


def test_sun2_wrong_sdmmac():
    original_sdmmac_param = config.SDMMAC_PARAM
    try:
        config.SDMMAC_PARAM = "cmac"
        decrypt_sun_message(
            param_mode=ParamMode.SEPARATED,
            sdm_meta_read_key=binascii.unhexlify('00000000000000000000000000000000'),
            sdm_file_read_key=lambda _: binascii.unhexlify('00000000000000000000000000000000'),
            picc_enc_data=binascii.unhexlify("FD91EC264309878BE6345CBE53BADF40"),
            sdmmac=binascii.unhexlify("3CC1E7F6C6C33B33"),
            enc_file_data=binascii.unhexlify("CEE9A53E3E463EF1F459635736738962"))
    except InvalidMessage:
        # this is expected
        pass
    else:
        raise RuntimeError("InvalidSDMMAC was not thrown as expected")
    finally:
        config.SDMMAC_PARAM = original_sdmmac_param


def test_plain_sdm():
    validate_plain_sun(
        uid=binascii.unhexlify('041E3C8A2D6B80'),
        read_ctr=binascii.unhexlify('000006'),
        sdmmac=binascii.unhexlify('4B00064004B0B3D3'),
        sdm_file_read_key=binascii.unhexlify('00000000000000000000000000000000'),
        mode=EncMode.AES
    )


def test_plain_sdm_wrong():
    try:
        validate_plain_sun(
            uid=binascii.unhexlify('041E3C8A2D6B80'),
            read_ctr=binascii.unhexlify('000006'),
            sdmmac=binascii.unhexlify('AB00064004B0B3AB'),
            sdm_file_read_key=binascii.unhexlify('00000000000000000000000000000000'),
            mode=EncMode.AES
        )
    except InvalidMessage:
        # this is expected
        pass
    else:
        raise RuntimeError("InvalidMessage was not thrown as expected")


def test_sdm_lrp1():
    res = decrypt_sun_message(
        param_mode=ParamMode.SEPARATED,
        sdm_meta_read_key=binascii.unhexlify('00000000000000000000000000000000'),
        sdm_file_read_key=lambda _: binascii.unhexlify('00000000000000000000000000000000'),
        picc_enc_data=binascii.unhexlify("07D9CA2545881D4BFDD920BE1603268C0714420DD893A497"),
        enc_file_data=binascii.unhexlify("D6E921C47DB4C17C56F979F81559BB83"),
        sdmmac=binascii.unhexlify("F9481AC7D855BDB6"))

    assert res['picc_data_tag'] == b"\xc7"
    assert res['uid'] == binascii.unhexlify("049b112a2f7080")
    assert res['read_ctr'] == 4
    assert res['file_data'] == b"NTXXb7dz3PsYYBlU"
    assert res['encryption_mode'] == EncMode.LRP


def test_sdm_lrp2():
    res = decrypt_sun_message(
        param_mode=ParamMode.SEPARATED,
        sdm_meta_read_key=binascii.unhexlify('00000000000000000000000000000000'),
        sdm_file_read_key=lambda _: binascii.unhexlify('00000000000000000000000000000000'),
        picc_enc_data=binascii.unhexlify("1FCBE61B3E4CAD980CBFDD333E7A4AC4A579569BAFD22C5F"),
        sdmmac=binascii.unhexlify("4231608BA7B02BA9"))

    assert res['picc_data_tag'] == b"\xc7"
    assert res['uid'] == binascii.unhexlify("04940e2a2f7080")
    assert res['read_ctr'] == 3
    assert res['file_data'] is None
    assert res['encryption_mode'] == EncMode.LRP


def test_decrypt_with_kdf1():
    MASTER_KEY = binascii.unhexlify('47BBB68AFA73F31310BEEFCE5DDA692DBAD671A03FEAD5A9BBDBCF3CD6D4C521')

    res = decrypt_sun_message(
        param_mode=ParamMode.BULK,
        sdm_meta_read_key=derive_undiversified_key(MASTER_KEY, 1),
        sdm_file_read_key=lambda uid: derive_tag_key(MASTER_KEY, uid, 2),
        picc_enc_data=binascii.unhexlify('8DE9030262807261850FCCF5FE007E21'),
        enc_file_data=binascii.unhexlify('382B4C3D68552C3A5F417F0695A3D857923764E1737AD1F80E834E46387F45DC77FE7468BBCF9DBF43B29CA58E8D6435F908C9C0CD56E9B4B9960FE1279C5DF1'),
        sdmmac=binascii.unhexlify('DF3EF20BE7D91C8E'))

    assert res['picc_data_tag'] == b"\xc7"
    assert res['uid'] == binascii.unhexlify("04c24eda926980")
    assert res['read_ctr'] == 1
    assert res['file_data'] == b"NT1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxEEEEEEEEEEEE"
    assert res['encryption_mode'] == EncMode.AES


def test_decrypt_with_kdf2():
    MASTER_KEY = binascii.unhexlify('47BBB68AFA73F31310BEEFCE5DDA692DBAD671A03FEAD5A9BBDBCF3CD6D4C521')

    res = decrypt_sun_message(
        param_mode=ParamMode.BULK,
        sdm_meta_read_key=derive_undiversified_key(MASTER_KEY, 1),
        sdm_file_read_key=lambda uid: derive_tag_key(MASTER_KEY, uid, 2),
        picc_enc_data=binascii.unhexlify('4F5B914723915D456C038FE658686CD5'),
        enc_file_data=binascii.unhexlify('5CE7DCDEA93F5DA7AAA0AADC97485ABF'),
        sdmmac=binascii.unhexlify('FFCD8DE82AD05289'))

    assert res['picc_data_tag'] == b"\xc7"
    assert res['uid'] == binascii.unhexlify("047d5f2aaa6180")
    assert res['read_ctr'] == 2
    assert res['file_data'] == b"CC\x04aaaaEEEEEEEEE"
    assert res['encryption_mode'] == EncMode.AES
